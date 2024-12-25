import type { KVNamespace } from '@cloudflare/workers-types';
import type { EmailCache, EmailHandleStatus } from '../types';

export type AddressListStoreKey = 'BLOCK_LIST' | 'WHITE_LIST';

export class Dao {
    private readonly db: KVNamespace;

    constructor(db: KVNamespace) {
        this.db = db;
        this.loadArrayFromDB = this.loadArrayFromDB.bind(this);
        this.addAddress = this.addAddress.bind(this);
        this.removeAddress = this.removeAddress.bind(this);
        this.loadMailStatus = this.loadMailStatus.bind(this);
        this.loadMailCache = this.loadMailCache.bind(this);
    }

    async loadArrayFromDB(key: AddressListStoreKey): Promise<string[]> {
        try {
            const raw = await this.db.get(key);
            return loadArrayFromRaw(raw);
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    async addAddress(address: string, type: AddressListStoreKey): Promise<void> {
        const list = await this.loadArrayFromDB(type);
        list.unshift(address);
        await this.db.put(type, JSON.stringify(list));
    }

    async removeAddress(address: string, type: AddressListStoreKey): Promise<void> {
        const list = await this.loadArrayFromDB(type);
        const result = list.filter(item => item !== address);
        await this.db.put(type, JSON.stringify(result));
    }

    async loadMailStatus(id: string, guardian: boolean): Promise<EmailHandleStatus> {
        const defaultStatus = {
            telegram: false,
            forward: [],
        };
        if (guardian) {
            try {
                const raw = await this.db.get(id);
                if (raw) {
                    return {
                        ...defaultStatus,
                        ...JSON.parse(raw),
                    };
                }
            } catch (e) {
                console.error(e);
            }
        }
        return defaultStatus;
    }

    async loadMailCache(id: string): Promise<EmailCache | null> {
        try {
            const raw = await this.db.get(id);
            if (raw) {
                return JSON.parse(raw);
            }
        } catch (e) {
            console.error(e);
        }
        return null;
    }
}

export function loadArrayFromRaw(raw: string | null): string[] {
    if (!raw) {
        return [];
    }
    let list = [];
    try {
        list = JSON.parse(raw);
    } catch {
        return [];
    }
    if (!Array.isArray(list)) {
        return [];
    }
    return list;
}

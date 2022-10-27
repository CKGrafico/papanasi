import { ItchioGameInfo } from './itchio.model';
declare class ItchioService {
    getClasses(className: string): {
        base: any;
    };
    attachButton(actionRef: any, user: string, game: string, width: number, height: number): void;
    getGameData(actionRef: any, user: string, game: string, width: number, height: number, secret: string): Promise<ItchioGameInfo>;
    loadScript(): Promise<void>;
    processInfo(actionRef: any, user: string, game: string, width: number, height: number, secret: string, callback: (data: ItchioGameInfo) => void): Promise<void>;
}
export declare const itchioService: ItchioService;
export {};

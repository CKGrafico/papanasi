declare class AvatarService {
    getClasses(variant: string, disabled: boolean, className: string): {
        base: any;
        container: any;
    };
    getStyles(name: string, variant: string): {
        container: {
            color?: undefined;
            backgroundColor?: undefined;
        } | {
            color: any;
            backgroundColor: any;
        };
    };
    getInitials(name: string): string;
    getColor(name: string, variant: string): {
        color?: undefined;
        backgroundColor?: undefined;
    } | {
        color: any;
        backgroundColor: any;
    };
    getSource(url: string, unavatar: string): string;
}
export declare const avatarService: AvatarService;
export {};

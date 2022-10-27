import { CodeJar } from '../helpers';
import { CodeTheme } from './code.model';
export declare class CodeService {
    styles: any[];
    jar: CodeJar;
    hljs: any;
    currentThemeIndex: number;
    getClasses(language: string, className: string): {
        base: any;
        editor: any;
    };
    initialize(codeRef: any, language: string, theme: CodeTheme, callback: () => void): Promise<void>;
    destroy(): void;
    update(code: string): void;
    onUpdate(callback: (code: string) => void): void;
    setEditable(codeRef: any, editable: boolean): Promise<void>;
    private loadLanguage;
    private registerLanguage;
    private registerThemes;
    private updateCurrentTheme;
    private highlightCode;
}

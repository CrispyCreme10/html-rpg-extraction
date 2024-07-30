export class KeybindController {
  private static instance: KeybindController;

  private constructor() {}

  static getInstance(): KeybindController {
    if (!KeybindController.instance) {
      KeybindController.instance = new KeybindController();
      KeybindController.instance.setDefaultKeybinds();
    }

    return KeybindController.instance;
  }

  private keybinds: { [key: string]: () => void } = {};

  setDefaultKeybinds() {}

  addKeybind(key: string, callback: () => void) {
    this.keybinds[key] = callback;
  }

  removeKeybind(key: string) {
    delete this.keybinds[key];
  }

  handleMouseEvent = (event: MouseEvent) => {
    const button = event.button;
    if (this.keybinds[button]) {
      this.keybinds[button]();
    }
  };

  handleKeyboardEvent = (event: KeyboardEvent) => {
    const key = event.key;
    if (this.keybinds[key]) {
      this.keybinds[key]();
    }
  };
}

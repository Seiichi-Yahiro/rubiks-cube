import { vi } from 'vitest';

export const spyOnAction = <
    T extends {
        [key in keyof T]: { type: string; match: (action: unknown) => boolean };
    },
>(
    actions: T,
    action: keyof T,
) => {
    const t = actions[action].type;
    const match = actions[action].match;
    // @ts-expect-error vitest doesn't like the type of action I don't know why
    const spy = vi.spyOn(actions, action);
    actions[action].type = t;
    actions[action].match = match;
    return spy;
};

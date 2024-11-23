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
    // @ts-expect-error jest doesn't like the type of action i don't know why
    const spy = jest.spyOn(actions, action);
    actions[action].type = t;
    actions[action].match = match;
    return spy;
};

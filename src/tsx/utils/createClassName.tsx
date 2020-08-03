export interface IClassNameList {
    hasClasses: boolean;
    classNames: string[];
}

export type ClassNameDictionary = {
    [key: string]: boolean | undefined;
};

const isClassNameList = (arg: ClassNameDictionary | IClassNameList): arg is IClassNameList =>
    (arg as IClassNameList).classNames !== undefined;

/**
 * Create a single className string out of multiple classNames
 *
 * @param {string | ClassNameDictionary | IClassNameList}  classNames - classNames as simple string,
 * ClassNameDictionary where the key is used as classname and the value defines if it is used ({'myClass': true}),
 * ClassNameList where a boolean key defines if a whole list of classes should be used {hasClasses: true, classNames: ['myClass']}
 * @return {string} - the className
 */
const createClassName = (...classNames: (string | undefined | ClassNameDictionary | IClassNameList)[]) =>
    classNames
        .map((className) => {
            if (typeof className === 'object') {
                if (isClassNameList(className)) {
                    return className.hasClasses ? className.classNames.join(' ') : '';
                } else {
                    return Object.keys(className)
                        .filter((key) => className[key])
                        .join(' ');
                }
            }
            return className;
        })
        .filter((className) => className?.length)
        .join(' ');

export default createClassName;

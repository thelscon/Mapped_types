// Вам потрібно створити тип DeepReadonly який буде робити доступними тільки
// для читання навіть властивості вкладених обʼєктів.

type DeepReadonly<ObjectT> = {
    readonly [Key in keyof ObjectT] : Readonly<ObjectT[Key]>
}



// Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки 
// для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.

type DeepRequireReadonly<ObjectT> = {
    readonly [Key in keyof ObjectT] -?: Required<Readonly<ObjectT[Key]>>
}



// Вам потрібно сворити тип UpperCaseKeys, який буде приводити всі ключи 
// до верхнього регістру.

type ToUppercase<Type> = Type extends string ? Uppercase<Type> : Type

type UpperCaseKeys<ObjectT> = {
    [Key in keyof ObjectT as ToUppercase<Key>] : ObjectT[Key]
}



// Стоврити тип, що на основі єнаму генерує тип об'єкту, що як ключ має назву 
// ключа єнаму з додатковим префіксом 'get-' а як значення просто функцію

const enum EObjectProperties {
    name ,
    age ,
    id
}

type ObjectBasedEnum = Record<`get-${keyof typeof EObjectProperties}` , () => void>



// І саме цікаве. Створіть тип ObjectToPropertyDescriptor, який перетворює 
// звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

// Простая версия
type ObjectToPropertyDescriptor<ObjectT> = {
    [Key in keyof ObjectT] : PropertyDescriptor
}

// Все типы значений свойств объекта данного типа приводятся к типу PropertyDescriptor
type EmptyObjectToPropertyDescriptor = {
    [index : number | string | symbol] : PropertyDescriptor
}

type PropertyDescriptorExtendsType<ValueT> = Partial<{
    value : ValueT ,
    writable : boolean ,
    enumerable : boolean ,
    configurable : boolean ,
    get () : ValueT ,
    set (value : ValueT) : void
}>

// Расширенная версия. Изменяет тип значений свойств указанного объекта на PropertyDescriptor, 
// сохраняя при этом их изначальный тип в value
type ObjectToPropertyDescriptorExtends<ObjectT> = {
    [Key in keyof ObjectT] : PropertyDescriptorExtendsType<ObjectT[Key]>
}



// Створити тип, що буде повертати тип параметру функції (Якщо в параметрі вказано 
// массив number[] то вірним типом буде number)

type IfParamArrayNumber<ParamT> = ParamT extends Array<number> ? number : ParamT

type ParamType<FuncT> = FuncT extends (param : infer ParamT) => void ? IfParamArrayNumber<ParamT> : never
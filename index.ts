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

enum EObjectProperties {
    name ,
    age ,
    id
}

type ObjectBasedEnum = Record<`get-${keyof typeof EObjectProperties}` , () => void>



// І саме цікаве. Створіть тип ObjectToPropertyDescriptor, який перетворює 
// звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

type PropertyDescriptorType = {
    value : any ,
    writable ?: boolean ,
    enumerable ?: boolean ,
    configurable ?: boolean
}

// Изменяет значения свойств указанного объекта на PropertyDescriptorType
type ObjectToPropertyDescriptor<ObjectT> = {
    [Key in keyof ObjectT] : PropertyDescriptorType /*или PropertyDescriptor */
}

// Все значения свойств объекта данного типа приводятся к типу PropertyDescriptorType
type EmptyObjectToPropertyDescriptor = {
    [index : number | string | symbol] : PropertyDescriptorType /*или PropertyDescriptor */
}



// Створити тип, що буде повертати тип параметру функції (Якщо в параметрі вказано 
// массив number[] то вірним типом буде number)

type IfParamArrayNumber<ParamT> = ParamT extends Array<number> ? number : ParamT

type ParamType<FuncT> = FuncT extends (param : infer ParamT) => void ? IfParamArrayNumber<ParamT> : never
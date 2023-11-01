"use strict";
// Вам потрібно створити тип DeepReadonly який буде робити доступними тільки
//  для читання навіть властивості вкладених обʼєктів.
// Стоврити тип, що на основі єнаму генерує тип об'єкту, що як ключ має назву 
// ключа єнаму з додатковим префіксом 'get-' а як значення просто функцію
var EObjectProperties;
(function (EObjectProperties) {
    EObjectProperties[EObjectProperties["name"] = 0] = "name";
    EObjectProperties[EObjectProperties["age"] = 1] = "age";
    EObjectProperties[EObjectProperties["id"] = 2] = "id";
})(EObjectProperties || (EObjectProperties = {}));

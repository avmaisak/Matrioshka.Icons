# Matrioshka.Icons

[![Build status](https://ci.appveyor.com/api/projects/status/hfm0y1naf1ni32jc?svg=true)](https://ci.appveyor.com/project/avmaisak/matrioshka-icons)
[![npm version](https://badge.fury.io/js/matrioshka.icons.svg)](https://badge.fury.io/js/matrioshka.icons)

Набор иконок для Вашего приложения на любой вкус.

Demo:
https://matrioshka.tools/icons

## Установка

Используя npm

```npm i matrioshka.icons```

### Самостоятельная установка

```git clone https://github.com/avmaisak/Matrioshka.Icons.git```

```cd Matrioshka.Icons```

```npm i```

```npm run build```


## Структура каталогов

[src] - Каталог с исходным кодом

[src/svg] - Каталог с иконками

[src/template] - Каталог с шаблонами для генерации шрифтов и css файла

[docs] - Каталог с документацией

[dist] - Каталог с готовым пакетом (после выполнения команды npm run build)

[dist/data] - Json файл со списком наименований всех иконок

## Добавление собственных иконок

Необходимо поместить иконку в каталог [src/svg]

Выполнить команду ```npm start```

В файл стилей добавится новый класс, соответствующий наименованию файла. Например, если файл назывался myicon, то будет создан css класс mi-myicon.

Для изменения префикса, скорректируйте шаблон в каталоге [src/template]


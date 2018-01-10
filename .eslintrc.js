// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true, //  eslint找到这个标识后，不会再去父文件夹中找eslint的配置文件
    parser: 'babel-eslint', //使用babel-eslint来作为eslint的解析器
    parserOptions: { // 设置解析器选项
        sourceType: 'module' // 表明自己的代码是ECMAScript模块
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard', // 继承eslint-config-standard里面提供的lint规则
    // required to lint *.vue files
    plugins: [ // 使用的插件eslint-plugin-html. 写配置文件的时候，可以省略eslint-plugin-
        'html'
    ],
    env: { // 定义预定义的全局变量,比如browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
        "browser": true,
        "node": true,
        "commonjs": true,
        "amd": true,
        "es6": true,
        "mocha": true
    },
    // 启用额外的规则或者覆盖基础配置中的规则的默认选项
    // 0 'off' (关闭规则) 1 'warn' (警告错误) 2 'error' (错误，程序退出)
    'rules': {
        // allow paren-less arrow functions
        'quotes': 0,
        'strict': 0,
        'eol-last': 'off', // 末尾是否需要添加换行
        'eqeqeq': 0, //判断是否用 === 代替 ==
        'arrow-parens': 0,
        "indent": [2, 4, { "SwitchCase": 1 }], //缩进风格
        "space-before-function-paren": 0, // 不允许函数括号之间存在空格
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 禁用 console
        "no-console": 0,
        // 禁止在条件中使用常量表达式
        // if (false) {
        //     doSomethingUnfinished();
        // } //cuowu
        "no-constant-condition": 0,
        // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
        "no-control-regex": 0,
        // 禁止 function 定义中出现重名参数
        "no-dupe-args": 2,
        // 禁止对象字面量中出现重复的 key
        "no-dupe-keys": 2,
        // 禁止重复的 case 标签
        "no-duplicate-case": 2,
        // 禁止在正则表达式中使用空字符集 (/^abc[]/)
        "no-empty-character-class": 2,
        //  禁止不必要的括号 //(a * b) + c;//报错
        "no-extra-parens": 0,
        // 禁止不必要的分号
        "no-extra-semi": 2,
        // 禁止 RegExp 构造函数中无效的正则表达式字符串
        "no-invalid-regexp": 2,
        // 禁止在字符串和注释之外不规则的空白
        "no-irregular-whitespace": 2,
        // 禁止在 in 表达式中出现否定的左操作数
        "no-negated-in-lhs": 2,
        //   禁止把全局对象 (Math 和 JSON) 作为函数调用  错误：var math = Math();
        "no-obj-calls": 2,
        // 禁止直接使用 Object.prototypes 的内置属性
        "no-prototype-builtins": 0,
        // 禁止正则表达式字面量中出现多个空格
        "no-regex-spaces": 2,
        // 禁用稀疏数组
        "no-sparse-arrays": 2,
        // 禁止出现令人困惑的多行表达式
        "no-unexpected-multiline": 2,
        // 禁止在return、throw、continue 和 break语句之后出现不可达代码
        /*
            function foo() {
            return true;
            console.log("done");
            }//错误
        */
        "no-unreachable": 2,
        // 要求使用 isNaN() 检查 NaN
        "use-isnan": 2,
        // 强制使用有效的 JSDoc 注释
        "valid-jsdoc": 0,

        //////////////
        // 最佳实践 //
        //////////////

        // 强制数组方法的回调函数中有 return 语句
        "array-callback-return": 0,
        // 强制把变量的使用限制在其定义的作用域范围内
        "block-scoped-var": 0,
        // 限制圈复杂度，也就是类似if else能连续接多少个
        "complexity": 0,
        //  要求 return 语句要么总是指定返回的值，要么不指定
        "consistent-return": 0,
        // 强制所有控制语句使用一致的括号风格
        "curly": [2, "all"],
        // 强制object.key 中 . 的位置，参数:
        //      property，'.'号应与属性在同一行
        //      object, '.' 号应与对象名在同一行
        "dot-location": [2, "property"],
        // 要求 for-in 循环中有一个 if 语句
        "guard-for-in": 0,
        // 禁用 arguments.caller 或 arguments.callee
        "no-caller": 2,
        // 不允许在 case 子句中使用词法声明
        "no-case-declarations": 2,
        // 禁止除法操作符显式的出现在正则表达式开始的位置
        "no-div-regex": 2,
        // 禁止 if 语句中有 return 之后有 else
        "no-else-return": 0,
        // 禁止使用空解构模式no-empty-pattern
        "no-empty-pattern": 2,
        // 禁止在没有类型检查操作符的情况下与 null 进行比较
        "no-eq-null": 1,
        // 禁用 eval()
        "no-eval": 2,
        // 禁用不必要的标签
        "no-extra-label:": 0,
        // 禁止 case 语句落空
        "no-fallthrough": 2,
        // 禁止使用短符号进行类型转换(!!fOO)
        "no-implicit-coercion": 0,
        // 禁止在全局范围内使用 var 和命名的 function 声明
        "no-implicit-globals": 1,
        // 禁止使用类似 eval() 的方法
        "no-implied-eval": 2,
        // 禁止 this 关键字出现在类和类对象之外
        "no-invalid-this": 0,
        //  禁用标签语句
        "no-labels": 2,
        // 禁止使用多个空格
        "no-multi-spaces": 2,
        // 禁止对 Function 对象使用 new 操作符
        "no-new-func": 1,
        // 不允许对 function 的参数进行重新赋值
        "no-param-reassign": 0,
        // 禁止使用 var 多次声明同一变量
        "no-redeclare": 2,
        // 禁用指定的通过 require 加载的模块
        "no-return-assign": 0,
        // 禁止使用 javascript: url
        "no-script-url": 0,
        // 禁止自我赋值
        "no-self-assign": 2,
        // 禁止自身比较
        "no-self-compare": 2,
        // 禁止出现未使用过的表达式
        "no-unused-expressions": 0,
        // 禁用未使用过的标签
        "no-unused-labels": 2,
        // 禁用不必要的转义字符
        "no-useless-escape": 0,
        // 禁用 void 操作符
        "no-void": 0,
        // 禁止在注释中使用特定的警告术语
        "no-warning-comments": 0,
        // 禁用 with 语句
        "no-with": 1,
        // 要求所有的 var 声明出现在它们所在的作用域顶部
        "vars-on-top": 0,
        // 要求或禁止使用严格模式指令
        "strict": 0,

        //////////////
        //  变量声明 //
        //////////////

        // 要求或禁止 var 声明中的初始化(初值)
        "init-declarations": 0,
        // 不允许 catch 子句的参数与外层作用域中的变量同名
        "no-catch-shadow": 0,
        // 禁止删除变量
        "no-delete-var": 2,
        // 不允许标签与变量同名
        "no-label-var": 2,
        // 禁用特定的全局变量
        "no-restricted-globals": 0,
        // 禁止 var 声明 与外层作用域的变量同名
        "no-shadow": 0,
        // 禁止覆盖受限制的标识符
        "no-shadow-restricted-names": 2,
        // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        "no-undef": 1,
        // 禁止将变量初始化为 undefined
        "no-undef-init": 0,
        // 禁止将 undefined 作为标识符
        "no-undefined": 0,
        // 禁止出现未使用过的变量
        "no-unused-vars": 0,
        // 不允许在变量定义之前使用它们
        "no-use-before-define": 0,

        // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        "array-bracket-spacing": [2, "never"],
        //强制使用一致的缩进 第二个参数为 "tab" 时，会使用tab，
        // if while function 后面的{必须与if在同一行，java风格。
        "brace-style": [2, "1tbs", { "allowSingleLine": true }],
        // 双峰驼命名格式
        "camelcase": 2,
        // 强制使用命名的 function 表达式
        "func-names": 0,
        // 要求在注释周围有空行      ( 要求在块级注释之前有一空行) [1, { "beforeBlockComment": true }],
        "lines-around-comment": 0,
        //  强制一致地使用函数声明或函数表达式，方法定义风格，参数：
        //    declaration: 强制使用方法声明的方式，function f(){} e.g [2, "declaration"]
        //    expression：强制使用方法表达式的方式，var f = function() {}  e.g [2, "expression"]
        //    allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, "declaration", { "allowArrowFunctions": true }]
        "func-style": 0,
        // 强制回调函数最大嵌套深度 5层
        "max-nested-callbacks": [1, 5],
        // 禁止使用指定的标识符
        "id-blacklist": 0,
        // 强制标识符的最新和最大长度
        "id-length": 0,
        // 要求标识符匹配一个指定的正则表达式
        "id-match": 0,
        // 强制最大行数
        "max-lines": 0,
        // 强制 function 定义中最多允许的参数数量
        "max-params": [1, 7],
        // 强制 function 块最多允许的的语句数量
        "max-statements": [1, 200],
        // 强制每一行中所允许的最大语句数量
        "max-statements-per-line": 0,
        // 要求构造函数首字母大写  （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
        "new-cap": [2, { "newIsCap": true, "capIsNew": false }],
        // 要求调用无参构造函数时有圆括号
        "new-parens": 2,
        // 要求或禁止 var 声明语句后有一行空行
        "newline-after-var": 0,
        // 禁用按位运算符
        "no-bitwise": 0,
        // 要求 return 语句之前有一空行
        "newline-before-return": 0,
        // 要求方法链中每个调用都有一个换行符
        "newline-per-chained-call": 1,
        // 禁用 continue 语句
        "no-continue": 0,
        // 禁止在代码行后使用内联注释
        "no-inline-comments": 0,
        // 禁止 if 作为唯一的语句出现在 else 语句中
        "no-lonely-if": 0,
        // 禁止混合使用不同的操作符
        "no-mixed-operators": 0,
        // 不允许空格和 tab 混合缩进
        "no-mixed-spaces-and-tabs": 2,
        // 不允许多个空行
        "no-multiple-empty-lines": 0,
        // 不允许否定的表达式
        "no-negated-condition": 0,
        // 不允许使用嵌套的三元表达式
        "no-nested-ternary": 0,
        // 禁止使用一元操作符 ++ 和 --
        "no-plusplus": 0,
        // 禁止使用特定的语法
        "no-restricted-syntax": 0,
        // 不允许使用三元操作符
        "no-ternary": 0,
        //  禁用行尾空格
        "no-trailing-spaces": 0,
        // 禁止标识符中有悬空下划线_bar
        "no-underscore-dangle": 0,
        // 禁止属性前有空白
        "no-whitespace-before-property": 0,
        // 强制花括号内换行符的一致性
        "object-curly-newline": 0,
        // 强制在花括号中使用一致的空格
        "object-curly-spacing": 0,
        // 强制将对象的属性放在不同的行上
        "object-property-newline": 0,
        // 强制函数中的变量要么一起声明要么分开声明
        "one-var": [2, { "initialized": "never" }],
        // 要求或禁止在 var 声明周围换行
        "one-var-declaration-per-line": 0,
        // 要求或禁止在可能的情况下要求使用简化的赋值操作符
        "operator-assignment": 0,
        // 要求或禁止块内填充
        "padded-blocks": 0,
        // 要求对象字面量属性名称用引号括起来
        "quote-props": 0,
        // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
        "semi": 0,
        // 强制分号之前和之后使用一致的空格
        "semi-spacing": 0,
        // 要求同一个声明块中的变量按顺序排列
        "sort-vars": 0,
        // 强制在注释中 // 或 /* 使用一致的空格
        "spaced-comment": 0,

        //////////////
        // ES6.相关 //
        //////////////

        // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
        "constructor-super": 0,
        // =>的前/后括号
        "arrow-spacing": 0,
        // 强制 generator 函数中 * 号周围使用一致的空格
        "generator-star-spacing": [2, { "before": true, "after": true }],
        // 禁止修改类声明的变量
        "no-class-assign": 2,
        // 不允许箭头功能，在那里他们可以混淆的比较
        "no-confusing-arrow": 0,
        // 禁止修改 const 声明的变量
        "no-const-assign": 2,
        // 禁止类成员中出现重复的名称
        "no-dupe-class-members": 2,
        // 不允许复制模块的进口
        "no-duplicate-imports": 0,
        // 允许指定模块加载时的进口
        "no-restricted-imports": 0,
        // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        "no-this-before-super": 2,
        // 禁止不必要的计算性能键对象的文字
        "no-useless-computed-key": 0,
        // 要求使用 let 或 const 而不是 var
        "no-var": 0,
        // 要求或禁止对象字面量中方法和属性使用简写语法
        "object-shorthand": 0,
        // 要求使用箭头函数作为回调
        "prefer-arrow-callback": 0,
        // 要求使用 const 声明那些声明后不再被修改的变量
        // enforce spacing between rest and spread operators and their expressions
        "rest-spread-spacing": 0,
        // 强制模块内的 import 排序
        "sort-imports": 0,
        // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
        "template-curly-spacing": 0,
    }
}
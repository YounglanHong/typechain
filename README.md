# ⛓Typechain

Learning Typescript by making a Blockchain with it

- 노마드 코더의 'Typescript로 블록체인 만들기' 강의를 따라가면서 배운 내용을 정리한 레포입니다.

  1. Typescript 설치

  - global 설치

    ```javascript
    yarn global add typescript
    ```

  - VsCode extension 설치: `TSLint`

  2. 컴파일 옵션 설정: `tsconfig.json`

     ```javascript
        {
          "compilerOptions": {
          "module": "commonjs",
          "target": "ES2015",
          "sourceMap": true
          },
          "include": [index.ts],
          "exclude": ["node_modules"]
      }
     ```

  3. TS로 컴파일

  - 명령어: `tsc`
  - `script` 추가
    ```javascript
    "scripts": {
    "start": "node index.js",
    "prestart": "tsc"
    }
    ```

  4. TS Example code

  - run `yarn start` to compile

    ```typescript
    // index.ts
    const person = {
      name = "Jenny",
      age: 24,
      gender: "female",
    };
    const sayHi = (name, age, gender) => {
      console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
    };

    sayHi(name, age, gender);
    /* sayHi(name, age); 
    // ERROR: Expected 3 arguments, but got 2 */

    export {};
    ```

  - OPTIONAL: `?` 추가

    ```typescript
    // index.ts
    const person = {
      name = "Jenny",
      age: 24,
      gender: "female",
    };

    const sayHi = (name, age, gender?) => {
      console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
    };
    ```

    5. Types in TS

    - Typing: parameters(매개변수)

    ```typescript
    // index.ts
    const person = {
      name = "Jenny",
      age: 24,
      gender: "female",
    };

    const sayHi = (name: string, age: number, gender: string) => {
      console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
    };
    ```

    - Typing: return value(결과값)

      ```typescript
      // index.ts
      const person = {
        name = "Jenny",
        age: 24,
        gender: "female",
      };

      const sayHi = (name: string, age: number, gender: string): string => {
        return `Hello ${name}, you are ${age}, you are a ${gender}`;
      };
      ```

    6.  `TSC watch` 설치

        - `src`: `ts` 파일
        - `dist`: 컴파일된 파일
          => `dist`를 `gitignore`에 추가

        ```javascript
            yarn add tsc-watch --dev
             // package.json
             "scripts": {
             "start": "tsc-watch --onSuccess \" node dist/index.js\" "
             }
             // tsconfig.json
             "compilerOptions": {

            "module": "commonjs",
            "target": "ES2015",
            "sourceMap": true,
            "outDir": "dist"  // 모든 컴파일된 파일
            },
            "include": ["src/**/*"], // 모든 ts 파일
            // src 폴더의 모든 것 컴파일
            "exclude": ["node_modules"]
            "include": ["src/**/*"]
        ```

    7.  Interfaces on TS

        ※ 주의: JS로 컴파일되지 않음

        ```typescript
        // TS에서만 작동
        interface Human {
          name: string;
          age: number;
          gender: string;
        }

        const person = {
          name = "Jenny",
          age: 24,
          gender: "female",
        };

        const sayHi = (person: Human): string => {
          return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
        };

        console.log(sayHi(person));
        ```

    8.  Classes on TS

        ※ 주의: Interface를 JS에 넣고 싶을 때 사용

        - TS에서는 class의 `속성`과 `권한` 선언해야 함

          - `public`: class 밖에서도 접근 가능
          - `private`: class 안에서만 접근 가능(속성 보호 기능)

        ```typescript
        // JS로 컴파일
        class Human {
          public name: string;
          public age: number;
          public gender: string;

          constructor(name: string, age: number, gender: string) {
            this.name = name;
            this.age = age;
            this.gender = gender;
          }
        }
        const Jenny = new Human("Jenny", 10, "female");

        const sayHi = (person: Human): string => {
          return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
        };

        console.log(sayHi(person));
        ```

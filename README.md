# github-auto-tag-product-suite

release 나 main(master) 에 push 가 발생하면 자동으로 tag 를 생성해주는 github action 입니다.
제품군에 해당하는 모든 저장소에 본 아래의 워크플로우 설정이 들어가 있어야 합니다.

```
name: Tag for product suite
on:
    push:
        branches: ['release', 'main']
    workflow_dispatch:
jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: steppay/github-auto-tag-product-suite@main
```

## 사용 방법

설정에 나와있다시피 `main` 을 참조합니다.
`yarn build` 한 뒤에 빌드된 파일인 `dist/bundle.js` 과 같이 저장소에 올리면 됩니다.

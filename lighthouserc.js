module.exports = {
  ci: {
    collect: {
      staticDistDir: "./build", // 빌드 결과물의 위치
      // startServerCommand: "npm run start", // 서버를 키는 명령어를 통해서도 실행 가능
      url: ["http://localhost:3000"],
      numberOfRuns: 5, // Lighthouse 가 5번 실행됨
    },
    upload: {
      target: "temporary-public-storage", // Lighthouse 서버에 결과가 업로드됨 명령어 실행 후 확인할 수 있는 link가 생성됨
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 1 }],
      },
    },
  },
};

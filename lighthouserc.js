module.exports = {
  ci: {
    collect: {
      staticDistDir: "./build", // 빌드 결과물의 위치
      // startServerCommand: "npm run start", // 서버를 키는 명령어를 통해서도 실행 가능
      url: ["http://localhost:3000"],
      numberOfRuns: 1, // Lighthouse 가 5번 실행됨
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 1 }],
      },
    },
  },
};

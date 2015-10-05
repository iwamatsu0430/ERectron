class ExampleERD {

  static environment = {
    dbPlugin: "mysql"
  }

  static colors = [
    {
      name: "myColor",
      text: {
        header: "#FFFFFF",
        body: "#999999"
      },
      background: {
        header: "#0AA2E4",
        body: "#FFFFFF"
      },
      border: "#0AA2E4"
    },
    {
      name: "myColor2",
      text: {
        header: "#FFFFFF",
        body: "#999999"
      },
      background: {
        header: "#0AA2E4",
        body: "#FFFFFF"
      },
      border: "#0AA2E4"
    },
  ];

  static info = {
    plugin: "mysql"
  }

  static tables = [
    {
      name: {
        logical: "メンバー",
        physical: "member"
      },
      columns: [
        {
          name: {
            logical: "メンバーID",
            physical: "_id"
          },
          type: "varchar",
          primary: true
        },
        {
          name: {
            logical: "メールアドレス",
            physical: "mail"
          },
          type: "varchar"
        },
        {
          name: {
            logical: "パスワード",
            physical: "password"
          },
          type: "varchar"
        },
        {
          name: {
            logical: "確認済フラグ",
            physical: "confirmed"
          },
          type: "boolean"
        }
      ],
    },
    {
      name: {
        logical: "ツイート",
        physical: "tweet"
      },
      columns: [
        {
          name: {
            logical: "ツイートID",
            physical: "_id"
          }
        },
        {
          name: {
            logical: "メンバーID",
            physical: "memberId"
          }
        },
        {
          name: {
            logical: "シェアコンテンツID",
            physical: "shareContentsId"
          }
        },
        {
          name: {
            logical: "コメント",
            physical: "comment"
          }
        },
        {
          name: {
            logical: "削除済みフラグ",
            physical: "deleted"
          }
        }
      ],
    },
    {
      name: {
        logical: "ツイート評価",
        physical: "tweetValue"
      },
      columns: [
        {
          name: {
            logical: "評価者メンバーID",
            physical: "valueFromMemberId"
          }
        },
        {
          name: {
            logical: "評価対象者メンバーID",
            physical: "valueToMemberId"
          }
        },
        {
          name: {
            logical: "評価対象ツイートID",
            physical: "valueToTweetId"
          }
        },
        {
          name: {
            logical: "評価スコア",
            physical: "valueScore"
          }
        }
      ],
    },
    {
      name: {
        logical: "シェアコンテンツ",
        physical: "shareContents"
      },
      columns: [
        {
          name: {
            logical: "シェアコンテンツID",
            physical: "_id"
          }
        },
        {
          name: {
            logical: "URL",
            physical: "url"
          }
        },
        {
          name: {
            logical: "サムネイル画像URL",
            physical: "thumbnailUrl"
          }
        },
        {
          name: {
            logical: "コンテンツタイトル",
            physical: "title"
          }
        }
      ],
    }
  ];

  static views = {
    tables: [
      {
        name: "member",
        position: {
          x: 100,
          y: 100
        },
        color: "myColor"
      },
      {
        name: "tweet",
        position: {
          x: 200,
          y: 200
        },
        color: "myColor"
      },
      {
        name: "tweetValue",
        position: {
          x: 300,
          y: 300
        },
        color: "myColor"
      },
      {
        name: "tweetValue",
        position: {
          x: 400,
          y: 400
        },
        color: "myColor"
      },
      {
        name: "shareContents",
        position: {
          x: 500,
          y: 500
        },
        color: "myColor"
      }
    ],
    relations: [
      {
        name: "memberToTweet",
        width: 2,
        color: "#0AA2E4",
        dasharray: "3 3"
      },
      {
        name: "memberToShareContents",
        width: 2,
        color: "#0AA2E4",
        dasharray: "3 3"
      },
      {
        name: "tweetToTweetValue",
        width: 2,
        color: "#0AA2E4",
        dasharray: "3 3"
      },
      {
        name: "tweetToShareContents",
        width: 2,
        color: "#0AA2E4",
        dasharray: "3 3"
      },
    ]
  };

  // cardinality:
  //   0 -> 0
  //   1 -> 1
  //   2 -> many
  static relations = [
    {
      name: {
        physical: "memberToTweet"
      },
      from: {
        table: "member",
        column: "_id",
        cardinality: {
          min: 1,
          max: 1
        }
      },
      to: {
        table: "tweet",
        column: "memberId",
        cardinality: {
          min: 0,
          max: 2
        }
      },
      style: {
        width: 2,
        color: "#0AA2E4",
        dasharray: "3 3"
      }
    },
    {
      name: {
        physical: "memberToShareContents"
      },
      from: {
        table: "member",
        column: "_id",
        cardinality: {
          min: 1,
          max: 1
        }
      },
      to: {
        table: "shareContents",
        column: "_id",
        cardinality: {
          min: 0,
          max: 2
        }
      },
      style: {
        width: 2,
        color: "#0AA2E4",
        dasharray: "3 3"
      }
    },
    {
      name: {
        physical: "tweetToTweetValue"
      },
      from: {
        table: "tweet",
        column: "_id",
        cardinality: {
          min: 1,
          max: 1
        }
      },
      to: {
        table: "tweetValue",
        column: "tweetId",
        cardinality: {
          min: 0,
          max: 2
        }
      },
      style: {
        width: 2,
        color: "#0AA2E4",
        dasharray: "3 3"
      }
    },
    {
      name: {
        physical: "tweetToShareContents"
      },
      from: {
        table: "tweet",
        column: "_id",
        cardinality: {
          min: 1,
          max: 1
        }
      },
      to: {
        table: "shareContents",
        column: "_id",
        cardinality: {
          min: 0,
          max: 2
        }
      },
      style: {
        width: 2,
        color: "#0AA2E4",
        dasharray: "3 3"
      }
    }
  ];
}

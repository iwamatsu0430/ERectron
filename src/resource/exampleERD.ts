class ExampleERD {

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
          }
        },
        {
          name: {
            logical: "メールアドレス",
            physical: "mail"
          }
        },
        {
          name: {
            logical: "パスワード",
            physical: "password"
          }
        },
        {
          name: {
            logical: "確認済フラグ",
            physical: "confirmed"
          }
        }
      ],
      color: "myColor",
      position: {
        x: 100,
        y: 100
      },
    },
    {
      name: {
        logical: "ツイート",
        physical: "tweet"
      },
      color: "myColor",
      position: {
        x: 300,
        y: 100
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
      color: "myColor",
      position: {
        x: 100,
        y: 100
      },
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
      color: "myColor",
      position: {
        x: 100,
        y: 100
      },
    }
  ];

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

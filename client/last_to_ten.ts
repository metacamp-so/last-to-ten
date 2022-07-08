export type LastToTen = {
  "version": "0.1.0",
  "name": "last_to_ten",
  "instructions": [
    {
      "name": "fillBucket",
      "accounts": [
        {
          "name": "bucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "bucket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "volume",
            "type": "u8"
          },
          {
            "name": "lastPlayer",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: LastToTen = {
  "version": "0.1.0",
  "name": "last_to_ten",
  "instructions": [
    {
      "name": "fillBucket",
      "accounts": [
        {
          "name": "bucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "bucket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "volume",
            "type": "u8"
          },
          {
            "name": "lastPlayer",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

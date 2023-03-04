export type TimeOfLife = {
  version: "0.1.0";
  name: "smart_contract";
  instructions: [
    {
      name: "createHealthInformation";
      accounts: [
        {
          name: "author";
          isMut: true;
          isSigner: true;
        },
        {
          name: "healthInformation";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "id";
          type: "publicKey";
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "lastName";
          type: "string";
        },
        {
          name: "age";
          type: "u8";
        },
        {
          name: "size";
          type: "u8";
        },
        {
          name: "weight";
          type: "u8";
        },
        {
          name: "bloodType";
          type: "string";
        },
        {
          name: "genderStr";
          type: "string";
        },
        {
          name: "isPregnant";
          type: "bool";
        },
        {
          name: "disease";
          type: {
            vec: "string";
          };
        },
        {
          name: "meds";
          type: {
            vec: "string";
          };
        },
        {
          name: "isDisabled";
          type: "bool";
        }
      ];
    },
    {
      name: "updateHealthInformation";
      accounts: [
        {
          name: "author";
          isMut: false;
          isSigner: true;
        },
        {
          name: "healthInformation";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "lastName";
          type: "string";
        },
        {
          name: "age";
          type: "u8";
        },
        {
          name: "size";
          type: "u8";
        },
        {
          name: "weight";
          type: "u8";
        },
        {
          name: "bloodType";
          type: "string";
        },
        {
          name: "genderStr";
          type: "string";
        },
        {
          name: "isPregnant";
          type: "bool";
        },
        {
          name: "disease";
          type: {
            vec: "string";
          };
        },
        {
          name: "meds";
          type: {
            vec: "string";
          };
        },
        {
          name: "isDisabled";
          type: "bool";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "healthInformation";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "lastName";
            type: "string";
          },
          {
            name: "age";
            type: "u8";
          },
          {
            name: "size";
            type: "u8";
          },
          {
            name: "weight";
            type: "u8";
          },
          {
            name: "bloodType";
            type: "string";
          },
          {
            name: "gender";
            type: {
              defined: "Gender";
            };
          },
          {
            name: "isPregnant";
            type: "bool";
          },
          {
            name: "diseases";
            type: {
              vec: "string";
            };
          },
          {
            name: "meds";
            type: {
              vec: "string";
            };
          },
          {
            name: "isDisabled";
            type: "bool";
          },
          {
            name: "author";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "Gender";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Male";
          },
          {
            name: "Female";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidGender";
      msg: "Invalid Gender";
    },
    {
      code: 6001;
      name: "InvalidPregnant";
      msg: "Invalid Pregnant";
    }
  ];
};

export const IDL: TimeOfLife = {
  version: "0.1.0",
  name: "smart_contract",
  instructions: [
    {
      name: "createHealthInformation",
      accounts: [
        {
          name: "author",
          isMut: true,
          isSigner: true,
        },
        {
          name: "healthInformation",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "id",
          type: "publicKey",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "lastName",
          type: "string",
        },
        {
          name: "age",
          type: "u8",
        },
        {
          name: "size",
          type: "u8",
        },
        {
          name: "weight",
          type: "u8",
        },
        {
          name: "bloodType",
          type: "string",
        },
        {
          name: "genderStr",
          type: "string",
        },
        {
          name: "isPregnant",
          type: "bool",
        },
        {
          name: "disease",
          type: {
            vec: "string",
          },
        },
        {
          name: "meds",
          type: {
            vec: "string",
          },
        },
        {
          name: "isDisabled",
          type: "bool",
        },
      ],
    },
    {
      name: "updateHealthInformation",
      accounts: [
        {
          name: "author",
          isMut: false,
          isSigner: true,
        },
        {
          name: "healthInformation",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "lastName",
          type: "string",
        },
        {
          name: "age",
          type: "u8",
        },
        {
          name: "size",
          type: "u8",
        },
        {
          name: "weight",
          type: "u8",
        },
        {
          name: "bloodType",
          type: "string",
        },
        {
          name: "genderStr",
          type: "string",
        },
        {
          name: "isPregnant",
          type: "bool",
        },
        {
          name: "disease",
          type: {
            vec: "string",
          },
        },
        {
          name: "meds",
          type: {
            vec: "string",
          },
        },
        {
          name: "isDisabled",
          type: "bool",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "healthInformation",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "lastName",
            type: "string",
          },
          {
            name: "age",
            type: "u8",
          },
          {
            name: "size",
            type: "u8",
          },
          {
            name: "weight",
            type: "u8",
          },
          {
            name: "bloodType",
            type: "string",
          },
          {
            name: "gender",
            type: {
              defined: "Gender",
            },
          },
          {
            name: "isPregnant",
            type: "bool",
          },
          {
            name: "diseases",
            type: {
              vec: "string",
            },
          },
          {
            name: "meds",
            type: {
              vec: "string",
            },
          },
          {
            name: "isDisabled",
            type: "bool",
          },
          {
            name: "author",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "Gender",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Male",
          },
          {
            name: "Female",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidGender",
      msg: "Invalid Gender",
    },
    {
      code: 6001,
      name: "InvalidPregnant",
      msg: "Invalid Pregnant",
    },
  ],
};

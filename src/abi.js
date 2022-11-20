export const Vote_address = '0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD'
export const Vote_ABI = [
    {
      "name": "AddType",
      "inputs": [
        {
          "name": "name",
          "type": "string",
          "indexed": false
        },
        {
          "name": "type_id",
          "type": "int128",
          "indexed": false
        }
      ],
      "anonymous": false,
      "type": "event"
    },
    {
      "name": "NewTypeWeight",
      "inputs": [
        {
          "name": "type_id",
          "type": "int128",
          "indexed": false
        },
        {
          "name": "time",
          "type": "uint256",
          "indexed": false
        },
        {
          "name": "weight",
          "type": "uint256",
          "indexed": false
        },
        {
          "name": "total_weight",
          "type": "uint256",
          "indexed": false
        }
      ],
      "anonymous": false,
      "type": "event"
    },
    {
      "name": "NewGaugeWeight",
      "inputs": [
        {
          "name": "gauge_address",
          "type": "address",
          "indexed": false
        },
        {
          "name": "time",
          "type": "uint256",
          "indexed": false
        },
        {
          "name": "weight",
          "type": "uint256",
          "indexed": false
        },
        {
          "name": "total_weight",
          "type": "uint256",
          "indexed": false
        }
      ],
      "anonymous": false,
      "type": "event"
    },
    {
      "name": "VoteForGauge",
      "inputs": [
        {
          "name": "time",
          "type": "uint256",
          "indexed": false
        },
        {
          "name": "user",
          "type": "address",
          "indexed": false
        },
        {
          "name": "gauge_addr",
          "type": "address",
          "indexed": false
        },
        {
          "name": "weight",
          "type": "uint256",
          "indexed": false
        }
      ],
      "anonymous": false,
      "type": "event"
    },
    {
      "name": "NewGauge",
      "inputs": [
        {
          "name": "addr",
          "type": "address",
          "indexed": false
        },
        {
          "name": "gauge_type",
          "type": "int128",
          "indexed": false
        },
        {
          "name": "weight",
          "type": "uint256",
          "indexed": false
        }
      ],
      "anonymous": false,
      "type": "event"
    },
    {
      "stateMutability": "nonpayable",
      "type": "constructor",
      "inputs": [
        {
          "name": "_voting_escrow",
          "type": "address"
        },
        {
          "name": "_authorizer_adaptor",
          "type": "address"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "token",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "voting_escrow",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "admin",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "gauge_exists",
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "gauge_types",
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "int128"
        }
      ]
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "add_gauge",
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "gauge_type",
          "type": "int128"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "add_gauge",
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "gauge_type",
          "type": "int128"
        },
        {
          "name": "weight",
          "type": "uint256"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "checkpoint",
      "inputs": [],
      "outputs": []
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "checkpoint_gauge",
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "gauge_relative_weight",
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "gauge_relative_weight",
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "time",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "gauge_relative_weight_write",
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "gauge_relative_weight_write",
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "time",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "add_type",
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "add_type",
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "weight",
          "type": "uint256"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "change_type_weight",
      "inputs": [
        {
          "name": "type_id",
          "type": "int128"
        },
        {
          "name": "weight",
          "type": "uint256"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "change_gauge_weight",
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "weight",
          "type": "uint256"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "vote_for_many_gauge_weights",
      "inputs": [
        {
          "name": "_gauge_addrs",
          "type": "address[8]"
        },
        {
          "name": "_user_weight",
          "type": "uint256[8]"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "vote_for_gauge_weights",
      "inputs": [
        {
          "name": "_gauge_addr",
          "type": "address"
        },
        {
          "name": "_user_weight",
          "type": "uint256"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "get_gauge_weight",
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "get_type_weight",
      "inputs": [
        {
          "name": "type_id",
          "type": "int128"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "get_total_weight",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "get_weights_sum_per_type",
      "inputs": [
        {
          "name": "type_id",
          "type": "int128"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "n_gauge_types",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "int128"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "n_gauges",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "int128"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "gauge_type_names",
      "inputs": [
        {
          "name": "arg0",
          "type": "int128"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "gauges",
      "inputs": [
        {
          "name": "arg0",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "vote_user_slopes",
      "inputs": [
        {
          "name": "arg0",
          "type": "address"
        },
        {
          "name": "arg1",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "components": [
            {
              "name": "slope",
              "type": "uint256"
            },
            {
              "name": "power",
              "type": "uint256"
            },
            {
              "name": "end",
              "type": "uint256"
            }
          ]
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "vote_user_power",
      "inputs": [
        {
          "name": "arg0",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "last_user_vote",
      "inputs": [
        {
          "name": "arg0",
          "type": "address"
        },
        {
          "name": "arg1",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "points_weight",
      "inputs": [
        {
          "name": "arg0",
          "type": "address"
        },
        {
          "name": "arg1",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "components": [
            {
              "name": "bias",
              "type": "uint256"
            },
            {
              "name": "slope",
              "type": "uint256"
            }
          ]
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "time_weight",
      "inputs": [
        {
          "name": "arg0",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "points_sum",
      "inputs": [
        {
          "name": "arg0",
          "type": "int128"
        },
        {
          "name": "arg1",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "components": [
            {
              "name": "bias",
              "type": "uint256"
            },
            {
              "name": "slope",
              "type": "uint256"
            }
          ]
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "time_sum",
      "inputs": [
        {
          "name": "arg0",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "points_total",
      "inputs": [
        {
          "name": "arg0",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "time_total",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "points_type_weight",
      "inputs": [
        {
          "name": "arg0",
          "type": "int128"
        },
        {
          "name": "arg1",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "time_type_weight",
      "inputs": [
        {
          "name": "arg0",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    }
  ]
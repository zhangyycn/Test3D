{
	"version":"LAYASCENE3D:01",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"Scene",
			"ambientColor":[
				0.212,
				0.227,
				0.259
			],
			"lightmaps":[],
			"enableFog":false,
			"fogStart":0,
			"fogRange":300,
			"fogColor":[
				0.5,
				0.5,
				0.5
			]
		},
		"child":[
			{
				"type":"Camera",
				"props":{
					"name":"Main Camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						1.59,
						16.01
					],
					"rotation":[
						0.020856,
						0,
						0,
						0.9997826
					],
					"scale":[
						1,
						1,
						1
					],
					"clearFlag":1,
					"orthographic":false,
					"fieldOfView":20,
					"nearPlane":0.3,
					"farPlane":1000,
					"viewport":[
						0,
						0,
						1,
						1
					],
					"clearColor":[
						0.1921569,
						0.3019608,
						0.4745098,
						0
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"DirectionLight",
				"props":{
					"name":"Directional Light",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						8.23,
						0
					],
					"rotation":[
						0.190453,
						0.3374238,
						0.1407659,
						-0.9110751
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":1.1,
					"lightmapBakedType":0,
					"color":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"Stage",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						33.88,
						-12.89619
					],
					"rotation":[
						0,
						0,
						-0.7071068,
						-0.7071068
					],
					"scale":[
						0.3417405,
						0.3417405,
						0.3417405
					],
					"meshPath":"Assets/RockGolem/Meshes/Stage-pCylinder1.lm",
					"enableRender":true,
					"materials":[
						{
							"type":"Laya.BlinnPhongMaterial",
							"path":"Assets/RockGolem/Materials/Stage 1.lmat"
						}
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"props":{
					"name":"PBR_Golem",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-1.33,
						0,
						0
					],
					"rotation":[
						0,
						-0.1261528,
						0,
						-0.9920108
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[
					{
						"type":"Animator",
						"avatar":{
							"path":"Assets/RockGolem/Meshes/FreeGolemMesh-PBR_Golem-FreeGolemMeshAvatar.lav",
							"linkSprites":{}
						},
						"layers":[
							{
								"name":"Base Layer",
								"weight":0,
								"blendingMode":0,
								"states":[
									{
										"name":"Attack01",
										"clipPath":"Assets/RockGolem/Animations/Attack01-Attack01.lani"
									},
									{
										"name":"Attack02",
										"clipPath":"Assets/RockGolem/Animations/Attack02-Attack02.lani"
									},
									{
										"name":"Idle",
										"clipPath":"Assets/RockGolem/Animations/Idle-Idle.lani"
									},
									{
										"name":"GetHit",
										"clipPath":"Assets/RockGolem/Animations/GetHit-GetHit.lani"
									},
									{
										"name":"Victory",
										"clipPath":"Assets/RockGolem/Animations/Victory-Victory.lani"
									},
									{
										"name":"Walk",
										"clipPath":"Assets/RockGolem/Animations/Walk-Walk.lani"
									},
									{
										"name":"Die",
										"clipPath":"Assets/RockGolem/Animations/Die-Die.lani"
									}
								]
							}
						],
						"cullingMode":0,
						"playOnWake":true
					}
				],
				"child":[
					{
						"type":"SkinnedMeshSprite3D",
						"props":{
							"name":"RockGolemMesh",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								7.699086E-10,
								0,
								-7.164999E-09
							],
							"rotation":[
								0,
								-2.827931E-09,
								0,
								-1
							],
							"scale":[
								0.01,
								0.01,
								0.01
							],
							"rootBone":"Hips",
							"boundBox":{
								"min":[
									-160.9803,
									-217.5071,
									-379.6653
								],
								"max":[
									321.1881,
									212.6123,
									415.0793
								]
							},
							"boundSphere":{
								"center":[
									80.1039,
									-2.447403,
									17.70699
								],
								"radius":512.1299
							},
							"materials":[
								{
									"type":"Laya.BlinnPhongMaterial",
									"path":"Assets/RockGolem/Materials/PBR_Golem.lmat"
								}
							],
							"meshPath":"Assets/RockGolem/Meshes/FreeGolemMesh-RockGolemMesh.lm"
						},
						"components":[],
						"child":[]
					}
				]
			},
			{
				"type":"Sprite3D",
				"props":{
					"name":"HP_Golem",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						2.8,
						0,
						-3.11
					],
					"rotation":[
						0,
						0.1111549,
						0,
						-0.9938031
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[
					{
						"type":"Animator",
						"avatar":{
							"path":"Assets/RockGolem/Meshes/FreeGolemMesh-HP_Golem-FreeGolemMeshAvatar.lav",
							"linkSprites":{}
						},
						"layers":[
							{
								"name":"Base Layer",
								"weight":0,
								"blendingMode":0,
								"states":[
									{
										"name":"Attack01",
										"clipPath":"Assets/RockGolem/Animations/Attack01-Attack01.lani"
									},
									{
										"name":"Attack02",
										"clipPath":"Assets/RockGolem/Animations/Attack02-Attack02.lani"
									},
									{
										"name":"Idle",
										"clipPath":"Assets/RockGolem/Animations/Idle-Idle.lani"
									},
									{
										"name":"GetHit",
										"clipPath":"Assets/RockGolem/Animations/GetHit-GetHit.lani"
									},
									{
										"name":"Victory",
										"clipPath":"Assets/RockGolem/Animations/Victory-Victory.lani"
									},
									{
										"name":"Walk",
										"clipPath":"Assets/RockGolem/Animations/Walk-Walk.lani"
									},
									{
										"name":"Die",
										"clipPath":"Assets/RockGolem/Animations/Die-Die.lani"
									}
								]
							}
						],
						"cullingMode":0,
						"playOnWake":true
					}
				],
				"child":[
					{
						"type":"SkinnedMeshSprite3D",
						"props":{
							"name":"RockGolemMesh",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-2.556388E-08,
								0,
								-4.033717E-08
							],
							"rotation":[
								0,
								4.725038E-09,
								0,
								-1
							],
							"scale":[
								0.009999999,
								0.01,
								0.009999999
							],
							"rootBone":"Hips",
							"boundBox":{
								"min":[
									-160.9803,
									-217.5071,
									-379.6653
								],
								"max":[
									321.1881,
									212.6123,
									415.0793
								]
							},
							"boundSphere":{
								"center":[
									80.1039,
									-2.447403,
									17.70699
								],
								"radius":512.1299
							},
							"materials":[
								{
									"type":"Laya.BlinnPhongMaterial",
									"path":"Assets/RockGolem/Materials/HP_Golem.lmat"
								}
							],
							"meshPath":"Assets/RockGolem/Meshes/FreeGolemMesh-RockGolemMesh.lm"
						},
						"components":[],
						"child":[]
					}
				]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"HP_Rock",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						4.11,
						0.91,
						1.51
					],
					"rotation":[
						0.08189369,
						0.9661062,
						0.005880824,
						-0.2447399
					],
					"scale":[
						0.01,
						0.01,
						0.01
					],
					"meshPath":"Assets/RockGolem/Meshes/Free_Rock-Rock01_RockMesh.lm",
					"enableRender":true,
					"materials":[
						{
							"type":"Laya.BlinnPhongMaterial",
							"path":"Assets/RockGolem/Materials/HP_Golem.lmat"
						}
					]
				},
				"components":[
					{
						"type":"Animator",
						"avatar":{
							"path":"Assets/RockGolem/Meshes/Free_Rock-HP_Rock-Free_RockAvatar.lav",
							"linkSprites":{}
						},
						"layers":[],
						"cullingMode":0,
						"playOnWake":true
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"PBR_Rock",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-3.11,
						0.87,
						3.99
					],
					"rotation":[
						-0.08109792,
						-0.9964332,
						-0.001892129,
						-0.02324798
					],
					"scale":[
						0.01,
						0.01,
						0.01
					],
					"meshPath":"Assets/RockGolem/Meshes/Free_Rock-Rock01_RockMesh.lm",
					"enableRender":true,
					"materials":[
						{
							"type":"Laya.BlinnPhongMaterial",
							"path":"Assets/RockGolem/Materials/PBR_Golem.lmat"
						}
					]
				},
				"components":[
					{
						"type":"Animator",
						"avatar":{
							"path":"Assets/RockGolem/Meshes/Free_Rock-PBR_Rock-Free_RockAvatar.lav",
							"linkSprites":{}
						},
						"layers":[],
						"cullingMode":0,
						"playOnWake":true
					}
				],
				"child":[]
			}
		]
	}
}
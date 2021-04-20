module.exports = [

	{
		"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=oxygen&regionId=${regionId}&hospitalType=",
    	"category":"Ліжковий фонд під COVID-19",
    	dates:"dates",
    	values:[
    		{
		        "variable": "count.selected",
		        field:"bedReservedOxygen",
		        "title": "Виділено (всього) ліжок з підведеним киснем",
		        "id": 0
		    },
		    {
		        "variable": "count.used",
		        field:"bedUsedOxygen",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=oxygen&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (всього) ліжок з підведеним киснем",
		        "id": 1
		    },
		    {
		        "variable": "count.used_confirmed",
		        "field": "bedUsedConfirmedOxygen",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=oxygen&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (COVID-19) ліжок з підведеним киснем",
		        "id": 2
		    },
		    {
		        "variable": "count.used_suspicious",
		        field:"bedUsedSuspiciousOxygen",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=oxygen&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (підозра) ліжок з підведеним киснем",
		        "id": 3
		    }
    	]
	},
    
    {
        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
    	"category":"Ліжковий фонд під COVID-19",
    	dates:"dates",
    	values:[
    		{
        		"variable": "count.selected",
		        "field": "bedReservedReanimation",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (всього) ліжок інтенсивної терапії",
		        "id": 4
		    },
		    {
		        "variable": "count.used",
		        "field": "bedUsedReanimation",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (всього) ліжок інтенсивної терапії",
		        "id": 5
		    },
		    {
		        "variable": "count.used_confirmed",
		        "field": "bedUsedConfirmedReanimation",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (COVID-19) ліжок інтенсивної терапії",
		        "id": 6
		    },
		    {
		        "variable": "count.used_suspicious",
		        "field": "bedUsedSuspiciousReanimation",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (підозра) ліжок інтенсивної терапії",
		        "id": 7
		    }
    	]
    },
    
    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=children&regionId=${regionId}&hospitalType=",
        "category":"Ліжковий фонд під COVID-19",
        dates:"dates",
    	values:[
	        {
		        "variable": "count.selected",
		         "field": "bedReservedChildren",
		        "title": "Виділено (всього) ліжок дитячих",
		        "id": 8
		    },
		    {
		        "variable": "count.used",
		        "field": "bedUsedChildren",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=children&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (всього) ліжок дитячих",
		        "id": 9
		    },
		    {
		        "variable": "count.used_confirmed",
		        "field": "bedUsedConfirmedChildren",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=children&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (COVID-19) ліжок дитячих",
		        "id": 10
		    },
		    {
		        "variable": "count.used_suspicious",
		        "field": "bedUsedSuspiciousChildren",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=children&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (підозра) ліжок дитячих",
		        "id": 11
		    }
        ]
    },

    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=maternity&regionId=${regionId}&hospitalType=",
    	"category":"Ліжковий фонд під COVID-19",
    	dates:"dates",
    	values:[
    		{
		        "variable": "count.selected",
		        "field": "bedReservedMaternity",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=maternity&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (всього) ліжок пологових",
		        "id": 12
		    },
		    {
		        "variable": "count.used",
		        "field": "bedUsedMaternity",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=maternity&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (всього) ліжок пологових",
		        "id": 13
		    },
		    {
		        "variable": "count.used_confirmed",
		        "field": "bedUsedConfirmedMaternity",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=maternity&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (COVID-19) ліжок пологових",
		        "id": 14
		    },
		    {
		        "variable": "count.used_suspicious",
		        "field": "bedUsedSuspiciousMaternity",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=maternity&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (підозра) ліжок пологових",
		        "id": 15
		    }
    	]
    },

    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=infectious&regionId=${regionId}&hospitalType=",
    	"category":"Ліжковий фонд під COVID-19",
    	dates:"dates",
    	values:[
    		{
		        "variable": "count.selected",
		        "field": "bedReservedInfectious",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=infectious&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (всього) ліжок всіх типів",
		        "id": 16
		    },
		    {
		        "variable": "count.used",
		        "field": "bedUsedInfectious",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=infectious&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (всього) ліжок всіх типів",
		        "id": 17
		    },
		    {
		        "variable": "count.used_confirmed",
		        "field": "bedUsedConfirmedInfectious",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=infectious&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (COVID-19) ліжок всіх типів",
		        "id": 18
		    },
		    {
		        "variable": "count.used_suspicious",
		        "field": "bedUsedSuspiciousInfectious",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/covid/chart?bedType=infectious&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (підозра) ліжок всіх типів",
		        "id": 19
		    }
    	]    
    },
    
	{
		"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=total&regionId=${regionId}&hospitalType=",
    	"category":"Загальний ліжковий фонд",
    	dates:"dates",
    	values:[
    		{
		        "variable": "count.all",
		        "field": "bedReservedTotal",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=total&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (всього) ліжок всіх типів",
		        "id": 20
		    },
		    {
		        "variable": "count.covid",
		        "field": "bedReservedTotalCovid",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=total&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (COVID-19) ліжок всіх типів",
		        "id": 21
		    },
		    {
		        "variable": "count.other",
		        "field": "bedReservedTotalOther",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=total&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (інше) ліжок всіх типів",
		        "id": 22
		    },
		    {
		        "variable": "count.used",
		        "field": "bedUsedTotalCovid",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=total&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (COVID-19) ліжок всіх типів",
		        "id": 23
		    }
    	]
	},
    
    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=oxygen&regionId=${regionId}&hospitalType=",
    	"category":"Загальний ліжковий фонд",
    	dates:"dates",
    	values:[
    		{
		        "variable": "count.all",
		        "field": "bedReservedOxigen",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=oxygen&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (всього) ліжок з підведеним киснем",
		        "id": 24
		    },
		    {
		        "variable": "count.covid",
		        "field": "bedReservedOxigenCovid",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=oxygen&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (COVID-19) ліжок з підведеним киснем",
		        "id": 25
		    },
		    {
		        "variable": "count.other",
		        "field": "bedReservedOxigenOther",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=oxygen&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (інше) ліжок з підведеним киснем",
		        "id": 26
		    },
		    {
		        "variable": "count.used",
		        "field": "bedUsedOxigenCovid",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=oxygen&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (COVID-19) ліжок з підведеним киснем",
		        "id": 27
		    }
    	]
    },

    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
        "category":"Загальний ліжковий фонд",
        dates:"dates",
    	values:[
        	{
		        "variable": "count.all",
		        "field": "bedReservedReanimation",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (всього) ліжок інтенсивної терапії",
		        "id": 28
		    },
		    {
		        "variable": "count.covid",
		        "field": "bedReservedReanimationCovid",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (COVID-19) ліжок інтенсивної терапії",
		        "id": 29
		    },
		    {
		        "variable": "count.other",
		        "field": "bedReservedReanimationOther",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
		        "title": "Виділено (інше) ліжок інтенсивної терапії",
		        "id": 30
		    },
		    {
		        "variable": "count.used",
		        "field": "bedUsedReanimationCovid",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/all/chart?bedType=reanimation&regionId=${regionId}&hospitalType=",
		        "title": "Зайнято (COVID-19) ліжок інтенсивної терапії",
		        "id": 31
		    }
        ]
    },
    
    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/hospitalization/chart?bedType=hospitalized&regionId=${regionId}&hospitalType=",
        "category":"Госпіталізація",
        dates:"dates",
    	values:[
        	{
		        "variable": "count.i1",
		        "field": "HospitalizedPerDay",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/hospitalization/chart?bedType=hospitalized&regionId=${regionId}&hospitalType=",
		        "title": "Госпіталізовано за добу",
		        "id": 32
		    },
		    {
		        "variable": "count.i2",
		        "field": "RecoveredPerDay",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/hospitalization/chart?bedType=hospitalized&regionId=${regionId}&hospitalType=",
		        "title": "Виписано за добу",
		        "id": 33
		    }
        ]
    },
    
    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/hospitalization/chart?bedType=imv&regionId=${regionId}&hospitalType=",
    	"category":"Госпіталізація",
    	dates:"dates",
    	values:[
    		{
		        "variable": "count.i1",
		        "field": "usedIvm",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/hospitalization/chart?bedType=imv&regionId=${regionId}&hospitalType=",
		        "title": "Підключено до ШВЛ",
		        "id": 34
		    }
    	]    
    },
    
    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/hospitalization/chart?bedType=ekmo&regionId=${regionId}&hospitalType=",
    	"category":"Госпіталізація",
    	dates:"dates",
    	values:[
    		{
		        "variable": "count.i1",
		        "field": "usedEkmoCovid",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/hospitalization/chart?bedType=ekmo&regionId=${regionId}&hospitalType=",
		        "title": "Підключено до ЕКМО (COVID-19)",
		        "id": 35
		    },
		    {
		        "variable": "count.i2",
		        "field": "usedEkmoSuspicious",
		        "urlTemplate": "https://health-security.rnbo.gov.ua/api/beds/hospitalization/chart?bedType=ekmo&regionId=${regionId}&hospitalType=",
		        "title": "Підключено до ЕКМО (підозра)",
		        "id": 36
		    }
    	]    
    },

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/vaccination/process/chart?vaccines=&dose=1&distributionBy=vaccine&regionId=${regionId}",
    	"category":"Динаміка проведення щеплення (вакцина)",
    	dates:"daily.dates",
    	values:[
    		{
		        "variable": "daily.quantity.AstraZeneca",
		        "field": "vaccinationAstraZeneca1",
		        "title": "AstraZeneca (1 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.Pfizer-BioNTech",
		        "field": "vaccinationPfizer1",
		        "title": "Pfizer-BioNTech (1 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.Sinovac Biotech",
		        "field": "vaccinationSinovac1",
		        "title": "Sinovac Biotech (1 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.Novavax",
		        "field": "vaccinationNovavax1",
		        "title": "Novavax (1 доза)",
		        "id": 35
		    }
    	]    
    },

    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/vaccination/process/chart?vaccines=&dose=2&distributionBy=vaccine&regionId=${regionId}",
    	"category":"Динаміка проведення щеплення (вакцина)",
    	dates:"daily.dates",
    	values:[
    		{
		        "variable": "daily.quantity.AstraZeneca",
		        "field": "vaccinationAstraZeneca2",
		        "title": "AstraZeneca (2 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.Pfizer-BioNTech",
		        "field": "vaccinationPfizer2",
		        "title": "Pfizer-BioNTech (2 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.Sinovac Biotech",
		        "field": "vaccinationSinovac2",
		        "title": "Sinovac Biotech (2 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.Novavax",
		        "field": "vaccinationNovavax2",
		        "title": "Novavax (2 доза)",
		        "id": 35
		    }
		    
    	]    
    },

    {
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/vaccination/process/chart?vaccines=&dose=1&distributionBy=age&regionId=${regionId}",
    	"category":"Динаміка проведення щеплення (вікова група)",
    	dates:"daily.dates",
    	
    	values:[
    		{
		        "variable": "daily.quantity.18_20",
		        "field": "vaccinationAge18_20_1",
		        "title": "18-20 (1 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.20_39",
		        "field": "vaccinationAge20_39_1",
		        "title": "20-39 (1 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.40_49",
		        "field": "vaccinationAge40_49_1",
		        "title": "40-49 (1 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.50_59",
		        "field": "vaccinationAge50_59_1",
		        "title": "50-59 (1 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.60_69",
		        "field": "vaccinationAge60_69_1",
		        "title": "60-69 (1 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.70_79",
		        "field": "vaccinationAge70_79_1",
		        "title": "70-79 (1 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.80_",
		        "field": "vaccinationAge80__1",
		        "title": "80+ (1 доза)",
		        "id": 35
		    },
		    
		    
    	]    
    },

{
    	"urlTemplate": "https://health-security.rnbo.gov.ua/api/vaccination/process/chart?vaccines=&dose=2&distributionBy=age&regionId=${regionId}",
    	"category":"Динаміка проведення щеплення (вікова група)",
    	dates:"daily.dates",
    	
    	values:[
    		{
		        "variable": "daily.quantity.18_20",
		        "field": "vaccinationAge18_20_2",
		        "title": "18-20 (2 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.20_39",
		        "field": "vaccinationAge20_39_2",
		        "title": "20-39 (2 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.40_49",
		        "field": "vaccinationAge40_49_2",
		        "title": "40-49 (2 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.50_59",
		        "field": "vaccinationAge50_59_2",
		        "title": "50-59 (2 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.60_69",
		        "field": "vaccinationAge60_69_2",
		        "title": "60-69 (2 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.70_79",
		        "field": "vaccinationAge70_79_2",
		        "title": "70-79 (2 доза)",
		        "id": 35
		    },
		    {
		        "variable": "daily.quantity.80_",
		        "field": "vaccinationAge80__2",
		        "title": "80+ (2 доза)",
		        "id": 35
		    }
    	]    
    },



    
]
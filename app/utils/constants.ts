// TODO: Move this file entirely to the prisma database
// TODO: Setup a seed variable file that contains this data instead.
// TODO: Maybe just make the seed script be runnable from the admin dashboard to seed the languages
export const COUNTRIES = [
	{ label: 'Aruba', value: 'AW', flag: '🇦🇼' },
	{ label: 'Afghanistan', value: 'AF', flag: '🇦🇫' },
	{ label: 'Angola', value: 'AO', flag: '🇦🇴' },
	{ label: 'Anguilla', value: 'AI', flag: '🇦🇮' },
	{ label: 'Åland Islands', value: 'AX', flag: '🇦🇽' },
	{ label: 'Albania', value: 'AL', flag: '🇦🇱' },
	{ label: 'Andorra', value: 'AD', flag: '🇦🇩' },
	{ label: 'United Arab Emirates', value: 'AE', flag: '🇦🇪' },
	{ label: 'Argentina', value: 'AR', flag: '🇦🇷' },
	{ label: 'Armenia', value: 'AM', flag: '🇦🇲' },
	{ label: 'American Samoa', value: 'AS', flag: '🇦🇸' },
	{ label: 'Antarctica', value: 'AQ', flag: '🇦🇶' },
	{ label: 'French Southern Territories', value: 'TF', flag: '🇹🇫' },
	{ label: 'Antigua and Barbuda', value: 'AG', flag: '🇦🇬' },
	{ label: 'Australia', value: 'AU', flag: '🇦🇺' },
	{ label: 'Austria', value: 'AT', flag: '🇦🇹' },
	{ label: 'Azerbaijan', value: 'AZ', flag: '🇦🇿' },
	{ label: 'Burundi', value: 'BI', flag: '🇧🇮' },
	{ label: 'Belgium', value: 'BE', flag: '🇧🇪' },
	{ label: 'Benin', value: 'BJ', flag: '🇧🇯' },
	{ label: 'Bonaire, Sint Eustatius and Saba', value: 'BQ', flag: '🇧🇶' },
	{ label: 'Burkina Faso', value: 'BF', flag: '🇧🇫' },
	{ label: 'Bangladesh', value: 'BD', flag: '🇧🇩' },
	{ label: 'Bulgaria', value: 'BG', flag: '🇧🇬' },
	{ label: 'Bahrain', value: 'BH', flag: '🇧🇭' },
	{ label: 'Bahamas', value: 'BS', flag: '🇧🇸' },
	{ label: 'Bosnia and Herzegovina', value: 'BA', flag: '🇧🇦' },
	{ label: 'Saint Barthélemy', value: 'BL', flag: '🇧🇱' },
	{ label: 'Belarus', value: 'BY', flag: '🇧🇾' },
	{ label: 'Belize', value: 'BZ', flag: '🇧🇿' },
	{ label: 'Bermuda', value: 'BM', flag: '🇧🇲' },
	{ label: 'Bolivia, Plurinational State of', value: 'BO', flag: '🇧🇴' },
	{ label: 'Brazil', value: 'BR', flag: '🇧🇷' },
	{ label: 'Barbados', value: 'BB', flag: '🇧🇧' },
	{ label: 'Brunei Darussalam', value: 'BN', flag: '🇧🇳' },
	{ label: 'Bhutan', value: 'BT', flag: '🇧🇹' },
	{ label: 'Bouvet Island', value: 'BV', flag: '🇧🇻' },
	{ label: 'Botswana', value: 'BW', flag: '🇧🇼' },
	{ label: 'Central African Republic', value: 'CF', flag: '🇨🇫' },
	{ label: 'Canada', value: 'CA', flag: '🇨🇦' },
	{ label: 'Cocos (Keeling) Islands', value: 'CC', flag: '🇨🇨' },
	{ label: 'Switzerland', value: 'CH', flag: '🇨🇭' },
	{ label: 'Chile', value: 'CL', flag: '🇨🇱' },
	{ label: 'China', value: 'CN', flag: '🇨🇳' },
	{ label: "Côte d'Ivoire", value: 'CI', flag: '🇨🇮' },
	{ label: 'Cameroon', value: 'CM', flag: '🇨🇲' },
	{ label: 'Congo, The Democratic Republic of the', value: 'CD', flag: '🇨🇩' },
	{ label: 'Congo', value: 'CG', flag: '🇨🇬' },
	{ label: 'Cook Islands', value: 'CK', flag: '🇨🇰' },
	{ label: 'Colombia', value: 'CO', flag: '🇨🇴' },
	{ label: 'Comoros', value: 'KM', flag: '🇰🇲' },
	{ label: 'Cabo Verde', value: 'CV', flag: '🇨🇻' },
	{ label: 'Costa Rica', value: 'CR', flag: '🇨🇷' },
	{ label: 'Cuba', value: 'CU', flag: '🇨🇺' },
	{ label: 'Curaçao', value: 'CW', flag: '🇨🇼' },
	{ label: 'Christmas Island', value: 'CX', flag: '🇨🇽' },
	{ label: 'Cayman Islands', value: 'KY', flag: '🇰🇾' },
	{ label: 'Cyprus', value: 'CY', flag: '🇨🇾' },
	{ label: 'Czechia', value: 'CZ', flag: '🇨🇿' },
	{ label: 'Germany', value: 'DE', flag: '🇩🇪' },
	{ label: 'Djibouti', value: 'DJ', flag: '🇩🇯' },
	{ label: 'Dominica', value: 'DM', flag: '🇩🇲' },
	{ label: 'Denmark', value: 'DK', flag: '🇩🇰' },
	{ label: 'Dominican Republic', value: 'DO', flag: '🇩🇴' },
	{ label: 'Algeria', value: 'DZ', flag: '🇩🇿' },
	{ label: 'Ecuador', value: 'EC', flag: '🇪🇨' },
	{ label: 'Egypt', value: 'EG', flag: '🇪🇬' },
	{ label: 'Eritrea', value: 'ER', flag: '🇪🇷' },
	{ label: 'Western Sahara', value: 'EH', flag: '🇪🇭' },
	{ label: 'Spain', value: 'ES', flag: '🇪🇸' },
	{ label: 'Estonia', value: 'EE', flag: '🇪🇪' },
	{ label: 'Ethiopia', value: 'ET', flag: '🇪🇹' },
	{ label: 'Finland', value: 'FI', flag: '🇫🇮' },
	{ label: 'Fiji', value: 'FJ', flag: '🇫🇯' },
	{ label: 'Falkland Islands (Malvinas)', value: 'FK', flag: '🇫🇰' },
	{ label: 'France', value: 'FR', flag: '🇫🇷' },
	{ label: 'Faroe Islands', value: 'FO', flag: '🇫🇴' },
	{ label: 'Micronesia, Federated States of', value: 'FM', flag: '🇫🇲' },
	{ label: 'Gabon', value: 'GA', flag: '🇬🇦' },
	{ label: 'United Kingdom', value: 'GB', flag: '🇬🇧' },
	{ label: 'Georgia', value: 'GE', flag: '🇬🇪' },
	{ label: 'Guernsey', value: 'GG', flag: '🇬🇬' },
	{ label: 'Ghana', value: 'GH', flag: '🇬🇭' },
	{ label: 'Gibraltar', value: 'GI', flag: '🇬🇮' },
	{ label: 'Guinea', value: 'GN', flag: '🇬🇳' },
	{ label: 'Guadeloupe', value: 'GP', flag: '🇬🇵' },
	{ label: 'Gambia', value: 'GM', flag: '🇬🇲' },
	{ label: 'Guinea-Bissau', value: 'GW', flag: '🇬🇼' },
	{ label: 'Equatorial Guinea', value: 'GQ', flag: '🇬🇶' },
	{ label: 'Greece', value: 'GR', flag: '🇬🇷' },
	{ label: 'Grenada', value: 'GD', flag: '🇬🇩' },
	{ label: 'Greenland', value: 'GL', flag: '🇬🇱' },
	{ label: 'Guatemala', value: 'GT', flag: '🇬🇹' },
	{ label: 'French Guiana', value: 'GF', flag: '🇬🇫' },
	{ label: 'Guam', value: 'GU', flag: '🇬🇺' },
	{ label: 'Guyana', value: 'GY', flag: '🇬🇾' },
	{ label: 'Hong Kong', value: 'HK', flag: '🇭🇰' },
	{ label: 'Heard Island and McDonald Islands', value: 'HM', flag: '🇭🇲' },
	{ label: 'Honduras', value: 'HN', flag: '🇭🇳' },
	{ label: 'Croatia', value: 'HR', flag: '🇭🇷' },
	{ label: 'Haiti', value: 'HT', flag: '🇭🇹' },
	{ label: 'Hungary', value: 'HU', flag: '🇭🇺' },
	{ label: 'Indonesia', value: 'ID', flag: '🇮🇩' },
	{ label: 'Isle of Man', value: 'IM', flag: '🇮🇲' },
	{ label: 'India', value: 'IN', flag: '🇮🇳' },
	{ label: 'British Indian Ocean Territory', value: 'IO', flag: '🇮🇴' },
	{ label: 'Ireland', value: 'IE', flag: '🇮🇪' },
	{ label: 'Iran, Islamic Republic of', value: 'IR', flag: '🇮🇷' },
	{ label: 'Iraq', value: 'IQ', flag: '🇮🇶' },
	{ label: 'Iceland', value: 'IS', flag: '🇮🇸' },
	{ label: 'Israel', value: 'IL', flag: '🇮🇱' },
	{ label: 'Italy', value: 'IT', flag: '🇮🇹' },
	{ label: 'Jamaica', value: 'JM', flag: '🇯🇲' },
	{ label: 'Jersey', value: 'JE', flag: '🇯🇪' },
	{ label: 'Jordan', value: 'JO', flag: '🇯🇴' },
	{ label: 'Japan', value: 'JP', flag: '🇯🇵' },
	{ label: 'Kazakhstan', value: 'KZ', flag: '🇰🇿' },
	{ label: 'Kenya', value: 'KE', flag: '🇰🇪' },
	{ label: 'Kyrgyzstan', value: 'KG', flag: '🇰🇬' },
	{ label: 'Cambodia', value: 'KH', flag: '🇰🇭' },
	{ label: 'Kiribati', value: 'KI', flag: '🇰🇮' },
	{ label: 'Saint Kitts and Nevis', value: 'KN', flag: '🇰🇳' },
	{ label: 'Korea, Republic of', value: 'KR', flag: '🇰🇷' },
	{ label: 'Kuwait', value: 'KW', flag: '🇰🇼' },
	{ label: "Lao People's Democratic Republic", value: 'LA', flag: '🇱🇦' },
	{ label: 'Lebanon', value: 'LB', flag: '🇱🇧' },
	{ label: 'Liberia', value: 'LR', flag: '🇱🇷' },
	{ label: 'Libya', value: 'LY', flag: '🇱🇾' },
	{ label: 'Saint Lucia', value: 'LC', flag: '🇱🇨' },
	{ label: 'Liechtenstein', value: 'LI', flag: '🇱🇮' },
	{ label: 'Sri Lanka', value: 'LK', flag: '🇱🇰' },
	{ label: 'Lesotho', value: 'LS', flag: '🇱🇸' },
	{ label: 'Lithuania', value: 'LT', flag: '🇱🇹' },
	{ label: 'Luxembourg', value: 'LU', flag: '🇱🇺' },
	{ label: 'Latvia', value: 'LV', flag: '🇱🇻' },
	{ label: 'Macao', value: 'MO', flag: '🇲🇴' },
	{ label: 'Saint Martin (French part)', value: 'MF', flag: '🇲🇫' },
	{ label: 'Morocco', value: 'MA', flag: '🇲🇦' },
	{ label: 'Monaco', value: 'MC', flag: '🇲🇨' },
	{ label: 'Moldova, Republic of', value: 'MD', flag: '🇲🇩' },
	{ label: 'Madagascar', value: 'MG', flag: '🇲🇬' },
	{ label: 'Maldives', value: 'MV', flag: '🇲🇻' },
	{ label: 'Mexico', value: 'MX', flag: '🇲🇽' },
	{ label: 'Marshall Islands', value: 'MH', flag: '🇲🇭' },
	{ label: 'North Macedonia', value: 'MK', flag: '🇲🇰' },
	{ label: 'Mali', value: 'ML', flag: '🇲🇱' },
	{ label: 'Malta', value: 'MT', flag: '🇲🇹' },
	{ label: 'Myanmar', value: 'MM', flag: '🇲🇲' },
	{ label: 'Montenegro', value: 'ME', flag: '🇲🇪' },
	{ label: 'Mongolia', value: 'MN', flag: '🇲🇳' },
	{ label: 'Northern Mariana Islands', value: 'MP', flag: '🇲🇵' },
	{ label: 'Mozambique', value: 'MZ', flag: '🇲🇿' },
	{ label: 'Mauritania', value: 'MR', flag: '🇲🇷' },
	{ label: 'Montserrat', value: 'MS', flag: '🇲🇸' },
	{ label: 'Martinique', value: 'MQ', flag: '🇲🇶' },
	{ label: 'Mauritius', value: 'MU', flag: '🇲🇺' },
	{ label: 'Malawi', value: 'MW', flag: '🇲🇼' },
	{ label: 'Malaysia', value: 'MY', flag: '🇲🇾' },
	{ label: 'Mayotte', value: 'YT', flag: '🇾🇹' },
	{ label: 'Namibia', value: 'NA', flag: '🇳🇦' },
	{ label: 'New Caledonia', value: 'NC', flag: '🇳🇨' },
	{ label: 'Niger', value: 'NE', flag: '🇳🇪' },
	{ label: 'Norfolk Island', value: 'NF', flag: '🇳🇫' },
	{ label: 'Nigeria', value: 'NG', flag: '🇳🇬' },
	{ label: 'Nicaragua', value: 'NI', flag: '🇳🇮' },
	{ label: 'Niue', value: 'NU', flag: '🇳🇺' },
	{ label: 'Netherlands', value: 'NL', flag: '🇳🇱' },
	{ label: 'Norway', value: 'NO', flag: '🇳🇴' },
	{ label: 'Nepal', value: 'NP', flag: '🇳🇵' },
	{ label: 'Nauru', value: 'NR', flag: '🇳🇷' },
	{ label: 'New Zealand', value: 'NZ', flag: '🇳🇿' },
	{ label: 'Oman', value: 'OM', flag: '🇴🇲' },
	{ label: 'Pakistan', value: 'PK', flag: '🇵🇰' },
	{ label: 'Panama', value: 'PA', flag: '🇵🇦' },
	{ label: 'Pitcairn', value: 'PN', flag: '🇵🇳' },
	{ label: 'Peru', value: 'PE', flag: '🇵🇪' },
	{ label: 'Philippines', value: 'PH', flag: '🇵🇭' },
	{ label: 'Palau', value: 'PW', flag: '🇵🇼' },
	{ label: 'Papua New Guinea', value: 'PG', flag: '🇵🇬' },
	{ label: 'Poland', value: 'PL', flag: '🇵🇱' },
	{ label: 'Puerto Rico', value: 'PR', flag: '🇵🇷' },
	{ label: "Korea, Democratic People's Republic of", value: 'KP', flag: '🇰🇵' },
	{ label: 'Portugal', value: 'PT', flag: '🇵🇹' },
	{ label: 'Paraguay', value: 'PY', flag: '🇵🇾' },
	{ label: 'Palestine, State of', value: 'PS', flag: '🇵🇸' },
	{ label: 'French Polynesia', value: 'PF', flag: '🇵🇫' },
	{ label: 'Qatar', value: 'QA', flag: '🇶🇦' },
	{ label: 'Réunion', value: 'RE', flag: '🇷🇪' },
	{ label: 'Romania', value: 'RO', flag: '🇷🇴' },
	{ label: 'Russian Federation', value: 'RU', flag: '🇷🇺' },
	{ label: 'Rwanda', value: 'RW', flag: '🇷🇼' },
	{ label: 'Saudi Arabia', value: 'SA', flag: '🇸🇦' },
	{ label: 'Sudan', value: 'SD', flag: '🇸🇩' },
	{ label: 'Senegal', value: 'SN', flag: '🇸🇳' },
	{ label: 'Singapore', value: 'SG', flag: '🇸🇬' },
	{
		label: 'South Georgia and the South Sandwich Islands',
		value: 'GS',
		flag: '🇬🇸',
	},
	{
		label: 'Saint Helena, Ascension and Tristan da Cunha',
		value: 'SH',
		flag: '🇸🇭',
	},
	{ label: 'Svalbard and Jan Mayen', value: 'SJ', flag: '🇸🇯' },
	{ label: 'Solomon Islands', value: 'SB', flag: '🇸🇧' },
	{ label: 'Sierra Leone', value: 'SL', flag: '🇸🇱' },
	{ label: 'El Salvador', value: 'SV', flag: '🇸🇻' },
	{ label: 'San Marino', value: 'SM', flag: '🇸🇲' },
	{ label: 'Somalia', value: 'SO', flag: '🇸🇴' },
	{ label: 'Saint Pierre and Miquelon', value: 'PM', flag: '🇵🇲' },
	{ label: 'Serbia', value: 'RS', flag: '🇷🇸' },
	{ label: 'South Sudan', value: 'SS', flag: '🇸🇸' },
	{ label: 'Sao Tome and Principe', value: 'ST', flag: '🇸🇹' },
	{ label: 'Suriname', value: 'SR', flag: '🇸🇷' },
	{ label: 'Slovakia', value: 'SK', flag: '🇸🇰' },
	{ label: 'Slovenia', value: 'SI', flag: '🇸🇮' },
	{ label: 'Sweden', value: 'SE', flag: '🇸🇪' },
	{ label: 'Eswatini', value: 'SZ', flag: '🇸🇿' },
	{ label: 'Sint Maarten (Dutch part)', value: 'SX', flag: '🇸🇽' },
	{ label: 'Seychelles', value: 'SC', flag: '🇸🇨' },
	{ label: 'Syrian Arab Republic', value: 'SY', flag: '🇸🇾' },
	{ label: 'Turks and Caicos Islands', value: 'TC', flag: '🇹🇨' },
	{ label: 'Chad', value: 'TD', flag: '🇹🇩' },
	{ label: 'Togo', value: 'TG', flag: '🇹🇬' },
	{ label: 'Thailand', value: 'TH', flag: '🇹🇭' },
	{ label: 'Tajikistan', value: 'TJ', flag: '🇹🇯' },
	{ label: 'Tokelau', value: 'TK', flag: '🇹🇰' },
	{ label: 'Turkmenistan', value: 'TM', flag: '🇹🇲' },
	{ label: 'Timor-Leste', value: 'TL', flag: '🇹🇱' },
	{ label: 'Tonga', value: 'TO', flag: '🇹🇴' },
	{ label: 'Trinidad and Tobago', value: 'TT', flag: '🇹🇹' },
	{ label: 'Tunisia', value: 'TN', flag: '🇹🇳' },
	{ label: 'Türkiye', value: 'TR', flag: '🇹🇷' },
	{ label: 'Tuvalu', value: 'TV', flag: '🇹🇻' },
	{ label: 'Taiwan, Province of China', value: 'TW', flag: '🇹🇼' },
	{ label: 'Tanzania, United Republic of', value: 'TZ', flag: '🇹🇿' },
	{ label: 'Uganda', value: 'UG', flag: '🇺🇬' },
	{ label: 'Ukraine', value: 'UA', flag: '🇺🇦' },
	{ label: 'United States Minor Outlying Islands', value: 'UM', flag: '🇺🇲' },
	{ label: 'Uruguay', value: 'UY', flag: '🇺🇾' },
	{ label: 'United States', value: 'US', flag: '🇺🇸' },
	{ label: 'Uzbekistan', value: 'UZ', flag: '🇺🇿' },
	{ label: 'Holy See (Vatican City State)', value: 'VA', flag: '🇻🇦' },
	{ label: 'Saint Vincent and the Grenadines', value: 'VC', flag: '🇻🇨' },
	{ label: 'Venezuela, Bolivarian Republic of', value: 'VE', flag: '🇻🇪' },
	{ label: 'Virgin Islands, British', value: 'VG', flag: '🇻🇬' },
	{ label: 'Virgin Islands, U.S.', value: 'VI', flag: '🇻🇮' },
	{ label: 'Viet Nam', value: 'VN', flag: '🇻🇳' },
	{ label: 'Vanuatu', value: 'VU', flag: '🇻🇺' },
	{ label: 'Wallis and Futuna', value: 'WF', flag: '🇼🇫' },
	{ label: 'Samoa', value: 'WS', flag: '🇼🇸' },
	{ label: 'Yemen', value: 'YE', flag: '🇾🇪' },
	{ label: 'South Africa', value: 'ZA', flag: '🇿🇦' },
	{ label: 'Zambia', value: 'ZM', flag: '🇿🇲' },
	{ label: 'Zimbabwe', value: 'ZW', flag: '🇿🇼' },
]

export const LANGUAGES = [
	{ name: 'Abkhaz', nativeName: 'аҧсуа' },
	{ name: 'Afar', nativeName: 'Afaraf' },
	{ name: 'Afrikaans', nativeName: 'Afrikaans' },
	{ name: 'Akan', nativeName: 'Akan' },
	{ name: 'Albanian', nativeName: 'Shqip' },
	{ name: 'Amharic', nativeName: 'አማርኛ' },
	{ name: 'Arabic', nativeName: 'العربية' },
	{ name: 'Aragonese', nativeName: 'Aragonés' },
	{
		name: 'Armenian',
		nativeName: 'Հայերեն',
	},
	{
		name: 'Assamese',
		nativeName: 'অসমীয়া',
	},
	{
		name: 'Avaric',
		nativeName: 'авар мацӀ, магӀарул мацӀ',
	},
	{
		name: 'Avestan',
		nativeName: 'avesta',
	},
	{
		name: 'Aymara',
		nativeName: 'aymar aru',
	},
	{
		name: 'Azerbaijani',
		nativeName: 'azərbaycan dili',
	},
	{
		name: 'Bambara',
		nativeName: 'bamanankan',
	},
	{
		name: 'Bashkir',
		nativeName: 'башҡорт теле',
	},
	{
		name: 'Basque',
		nativeName: 'euskara, euskera',
	},
	{
		name: 'Belarusian',
		nativeName: 'Беларуская',
	},
	{
		name: 'Bengali',
		nativeName: 'বাংলা',
	},
	{
		name: 'Bihari',
		nativeName: 'भोजपुरी',
	},
	{
		name: 'Bislama',
		nativeName: 'Bislama',
	},
	{
		name: 'Bosnian',
		nativeName: 'bosanski jezik',
	},
	{
		name: 'Breton',
		nativeName: 'brezhoneg',
	},
	{
		name: 'Bulgarian',
		nativeName: 'български език',
	},
	{
		name: 'Burmese',
		nativeName: 'ဗမာစာ',
	},
	{
		name: 'Catalan; Valencian',
		nativeName: 'Català',
	},
	{
		name: 'Chamorro',
		nativeName: 'Chamoru',
	},
	{
		name: 'Chechen',
		nativeName: 'нохчийн мотт',
	},
	{
		name: 'Chichewa; Chewa; Nyanja',
		nativeName: 'chiCheŵa, chinyanja',
	},
	{
		name: 'Chinese',
		nativeName: '中文 (Zhōngwén), 汉语, 漢語',
	},
	{
		name: 'Chuvash',
		nativeName: 'чӑваш чӗлхи',
	},
	{
		name: 'Cornish',
		nativeName: 'Kernewek',
	},
	{
		name: 'Corsican',
		nativeName: 'corsu, lingua corsa',
	},
	{
		name: 'Cree',
		nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ',
	},
	{
		name: 'Croatian',
		nativeName: 'hrvatski',
	},
	{
		name: 'Czech',
		nativeName: 'česky, čeština',
	},
	{
		name: 'Danish',
		nativeName: 'dansk',
	},
	{
		name: 'Divehi; Dhivehi; Maldivian;',
		nativeName: 'ދިވެހި',
	},
	{
		name: 'Dutch',
		nativeName: 'Nederlands, Vlaams',
	},
	{
		name: 'English',
		nativeName: 'English',
	},
	{
		name: 'Esperanto',
		nativeName: 'Esperanto',
	},
	{
		name: 'Estonian',
		nativeName: 'eesti, eesti keel',
	},
	{
		name: 'Ewe',
		nativeName: 'Eʋegbe',
	},
	{
		name: 'Faroese',
		nativeName: 'føroyskt',
	},
	{
		name: 'Fijian',
		nativeName: 'vosa Vakaviti',
	},
	{
		name: 'Finnish',
		nativeName: 'suomi, suomen kieli',
	},
	{
		name: 'French',
		nativeName: 'français, langue française',
	},
	{
		name: 'Fula; Fulah; Pulaar; Pular',
		nativeName: 'Fulfulde, Pulaar, Pular',
	},
	{
		name: 'Galician',
		nativeName: 'Galego',
	},
	{
		name: 'Georgian',
		nativeName: 'ქართული',
	},
	{
		name: 'German',
		nativeName: 'Deutsch',
	},
	{
		name: 'Greek, Modern',
		nativeName: 'Ελληνικά',
	},
	{
		name: 'Guaraní',
		nativeName: 'Avañeẽ',
	},
	{
		name: 'Gujarati',
		nativeName: 'ગુજરાતી',
	},
	{
		name: 'Haitian; Haitian Creole',
		nativeName: 'Kreyòl ayisyen',
	},
	{
		name: 'Hausa',
		nativeName: 'Hausa, هَوُسَ',
	},
	{
		name: 'Hebrew',
		nativeName: 'עברית',
	},
	{
		name: 'Hebrew',
		nativeName: 'עברית',
	},
	{
		name: 'Herero',
		nativeName: 'Otjiherero',
	},
	{
		name: 'Hindi',
		nativeName: 'हिन्दी, हिंदी',
	},
	{
		name: 'Hiri Motu',
		nativeName: 'Hiri Motu',
	},
	{
		name: 'Hungarian',
		nativeName: 'Magyar',
	},
	{
		name: 'Interlingua',
		nativeName: 'Interlingua',
	},
	{
		name: 'Indonesian',
		nativeName: 'Bahasa Indonesia',
	},
	{
		name: 'Interlingue',
		nativeName: 'Originally called Occidental; then Interlingue after WWII',
	},
	{
		name: 'Irish',
		nativeName: 'Gaeilge',
	},
	{
		name: 'Igbo',
		nativeName: 'Asụsụ Igbo',
	},
	{
		name: 'Inupiaq',
		nativeName: 'Iñupiaq, Iñupiatun',
	},
	{
		name: 'Ido',
		nativeName: 'Ido',
	},
	{
		name: 'Icelandic',
		nativeName: 'Íslenska',
	},
	{
		name: 'Italian',
		nativeName: 'Italiano',
	},
	{
		name: 'Inuktitut',
		nativeName: 'ᐃᓄᒃᑎᑐᑦ',
	},
	{
		name: 'Japanese',
		nativeName: '日本語 (にほんご／にっぽんご)',
	},
	{
		name: 'Javanese',
		nativeName: 'basa Jawa',
	},
	{
		name: 'Kalaallisut, Greenlandic',
		nativeName: 'kalaallisut, kalaallit oqaasii',
	},
	{
		name: 'Kannada',
		nativeName: 'ಕನ್ನಡ',
	},
	{
		name: 'Kanuri',
		nativeName: 'Kanuri',
	},
	{
		name: 'Kashmiri',
		nativeName: '',
	},
	{
		name: 'Kazakh',
		nativeName: 'Қазақ тілі',
	},
	{
		name: 'Khmer',
		nativeName: 'ភាសាខ្មែរ',
	},
	{
		name: 'Kikuyu, Gikuyu',
		nativeName: 'Gĩkũyũ',
	},
	{
		name: 'Kinyarwanda',
		nativeName: 'Ikinyarwanda',
	},
	{
		name: 'Kirghiz, Kyrgyz',
		nativeName: 'кыргыз тили',
	},
	{
		name: 'Komi',
		nativeName: 'коми кыв',
	},
	{
		name: 'Kongo',
		nativeName: 'KiKongo',
	},
	{
		name: 'Korean',
		nativeName: '한국어 (韓國語), 조선말 (朝鮮語)',
	},
	{
		name: 'Kurdish',
		nativeName: '',
	},
	{
		name: 'Kwanyama, Kuanyama',
		nativeName: 'Kuanyama',
	},
	{
		name: 'Latin',
		nativeName: 'latine, lingua latina',
	},
	{
		name: 'Luxembourgish, Letzeburgesch',
		nativeName: 'Lëtzebuergesch',
	},
	{
		name: 'Luganda',
		nativeName: 'Luganda',
	},
	{
		name: 'Limburgish, Limburgan, Limburger',
		nativeName: 'Limburgs',
	},
	{
		name: 'Lingala',
		nativeName: 'Lingála',
	},
	{
		name: 'Lao',
		nativeName: 'ພາສາລາວ',
	},
	{
		name: 'Lithuanian',
		nativeName: 'lietuvių kalba',
	},
	{
		name: 'Luba-Katanga',
		nativeName: '',
	},
	{
		name: 'Latvian',
		nativeName: 'latviešu valoda',
	},
	{
		name: 'Manx',
		nativeName: 'Gaelg, Gailck',
	},
	{
		name: 'Macedonian',
		nativeName: 'македонски јазик',
	},
	{
		name: 'Malagasy',
		nativeName: 'Malagasy fiteny',
	},
	{
		name: 'Malay',
		nativeName: '',
	},
	{
		name: 'Malayalam',
		nativeName: 'മലയാളം',
	},
	{
		name: 'Maltese',
		nativeName: 'Malti',
	},
	{
		name: 'Māori',
		nativeName: 'te reo Māori',
	},
	{
		name: 'Marathi (Marāṭhī)',
		nativeName: 'मराठी',
	},
	{
		name: 'Marshallese',
		nativeName: 'Kajin M̧ajeļ',
	},
	{
		name: 'Mongolian',
		nativeName: 'монгол',
	},
	{
		name: 'Nauru',
		nativeName: 'Ekakairũ Naoero',
	},
	{
		name: 'Navajo, Navaho',
		nativeName: 'Diné bizaad, Dinékʼehǰí',
	},
	{
		name: 'Norwegian Bokmål',
		nativeName: 'Norsk bokmål',
	},
	{
		name: 'North Ndebele',
		nativeName: 'isiNdebele',
	},
	{
		name: 'Nepali',
		nativeName: 'नेपाली',
	},
	{
		name: 'Ndonga',
		nativeName: 'Owambo',
	},
	{
		name: 'Norwegian Nynorsk',
		nativeName: 'Norsk nynorsk',
	},
	{
		name: 'Norwegian',
		nativeName: 'Norsk',
	},
	{
		name: 'Nuosu',
		nativeName: 'ꆈꌠ꒿ Nuosuhxop',
	},
	{
		name: 'South Ndebele',
		nativeName: 'isiNdebele',
	},
	{
		name: 'Occitan',
		nativeName: 'Occitan',
	},
	{
		name: 'Ojibwe, Ojibwa',
		nativeName: 'ᐊᓂᔑᓈᐯᒧᐎᓐ',
	},
	{
		name: 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic',
		nativeName: 'ѩзыкъ словѣньскъ',
	},
	{
		name: 'Oromo',
		nativeName: 'Afaan Oromoo',
	},
	{
		name: 'Oriya',
		nativeName: 'ଓଡ଼ିଆ',
	},
	{
		name: 'Ossetian, Ossetic',
		nativeName: 'ирон æвзаг',
	},
	{
		name: 'Panjabi, Punjabi',
		nativeName: '',
	},
	{
		name: 'Pāli',
		nativeName: 'पाऴि',
	},
	{
		name: 'Persian',
		nativeName: 'فارسی',
	},
	{
		name: 'Polish',
		nativeName: 'polski',
	},
	{
		name: 'Pashto, Pushto',
		nativeName: 'پښتو',
	},
	{
		name: 'Portuguese',
		nativeName: 'Português',
	},
	{
		name: 'Quechua',
		nativeName: 'Runa Simi, Kichwa',
	},
	{
		name: 'Romansh',
		nativeName: 'rumantsch grischun',
	},
	{
		name: 'Kirundi',
		nativeName: 'kiRundi',
	},
	{
		name: 'Romanian, Moldavian, Moldovan',
		nativeName: 'română',
	},
	{
		name: 'Russian',
		nativeName: 'русский язык',
	},
	{
		name: 'Sanskrit (Saṁskṛta)',
		nativeName: 'संस्कृतम्',
	},
	{
		name: 'Sardinian',
		nativeName: 'sardu',
	},
	{
		name: 'Sindhi',
		nativeName: '',
	},
	{
		name: 'Northern Sami',
		nativeName: 'Davvisámegiella',
	},
	{
		name: 'Samoan',
		nativeName: 'gagana faa Samoa',
	},
	{
		name: 'Sango',
		nativeName: 'yângâ tî sängö',
	},
	{
		name: 'Serbian',
		nativeName: 'српски језик',
	},
	{
		name: 'Scottish Gaelic; Gaelic',
		nativeName: 'Gàidhlig',
	},
	{
		name: 'Shona',
		nativeName: 'chiShona',
	},
	{
		name: 'Sinhala, Sinhalese',
		nativeName: 'සිංහල',
	},
	{
		name: 'Slovak',
		nativeName: 'slovenčina',
	},
	{
		name: 'Slovene',
		nativeName: 'slovenščina',
	},
	{
		name: 'Somali',
		nativeName: 'Soomaaliga, af Soomaali',
	},
	{
		name: 'Southern Sotho',
		nativeName: 'Sesotho',
	},
	{
		name: 'Spanish; Castilian',
		nativeName: 'español, castellano',
	},
	{
		name: 'Sundanese',
		nativeName: 'Basa Sunda',
	},
	{
		name: 'Swahili',
		nativeName: 'Kiswahili',
	},
	{
		name: 'Swati',
		nativeName: 'SiSwati',
	},
	{
		name: 'Swedish',
		nativeName: 'svenska',
	},
	{
		name: 'Tamil',
		nativeName: 'தமிழ்',
	},
	{
		name: 'Telugu',
		nativeName: 'తెలుగు',
	},
	{
		name: 'Tajik',
		nativeName: '',
	},
	{
		name: 'Thai',
		nativeName: 'ไทย',
	},
	{
		name: 'Tigrinya',
		nativeName: 'ትግርኛ',
	},
	{
		name: 'Tibetan Standard, Tibetan, Central',
		nativeName: 'བོད་ཡིག',
	},
	{
		name: 'Turkmen',
		nativeName: 'Türkmen, Түркмен',
	},
	{
		name: 'Tagalog',
		nativeName: 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔',
	},
	{
		name: 'Tswana',
		nativeName: 'Setswana',
	},
	{
		name: 'Tonga (Tonga Islands)',
		nativeName: 'faka Tonga',
	},
	{
		name: 'Turkish',
		nativeName: 'Türkçe',
	},
	{
		name: 'Tsonga',
		nativeName: 'Xitsonga',
	},
	{
		name: 'Tatar',
		nativeName: '',
	},
	{
		name: 'Twi',
		nativeName: 'Twi',
	},
	{
		name: 'Tahitian',
		nativeName: 'Reo Tahiti',
	},
	{
		name: 'Uighur, Uyghur',
		nativeName: '',
	},
	{
		name: 'Ukrainian',
		nativeName: 'українська',
	},
	{
		name: 'Urdu',
		nativeName: 'اردو',
	},
	{
		name: 'Uzbek',
		nativeName: '',
	},
	{
		name: 'Venda',
		nativeName: 'Tshivenḓa',
	},
	{
		name: 'Vietnamese',
		nativeName: 'Tiếng Việt',
	},
	{
		name: 'Volapük',
		nativeName: 'Volapük',
	},
	{
		name: 'Walloon',
		nativeName: 'Walon',
	},
	{
		name: 'Welsh',
		nativeName: 'Cymraeg',
	},
	{
		name: 'Wolof',
		nativeName: 'Wollof',
	},
	{
		name: 'Western Frisian',
		nativeName: 'Frysk',
	},
	{
		name: 'Xhosa',
		nativeName: 'isiXhosa',
	},
	{
		name: 'Yiddish',
		nativeName: 'ייִדיש',
	},
	{
		name: 'Yoruba',
		nativeName: 'Yorùbá',
	},
	{
		name: 'Zhuang, Chuang',
		nativeName: 'Saɯ cueŋƅ, Saw cuengh',
	},
]

export const AGE_RATINGS = [
	{ value: 'U', label: 'U' },
	{ value: 'PG', label: 'PG' },
	{ value: '12', label: '12' },
	{ value: '12A', label: '12A' },
	{ value: '15', label: '15' },
	{ value: '18', label: '18' },
]

export const STATUSES = [
	{ value: 'rumored', label: 'Rumored', icon: 'question-mark' },
	{ value: 'planned', label: 'Planned', icon: 'reader' },
	{ value: 'in production', label: 'In Production', icon: 'scissors' },
	{ value: 'post production', label: 'Post Production', icon: 'magic-wand' },
	{ value: 'released', label: 'Released', icon: 'check' },
	{ value: 'cancelled', label: 'Cancelled', icon: 'cross-1' },
]

type Role = {
	value: string
	label: string
	jobs: {
		value: string
		label: string
	}[]
}

export function getAllJobs() {
	const jobs: Role['jobs'] = []
	CREW_ROLES.forEach(department => {
		department.jobs.forEach(job => {
			jobs.push(job)
		})
	})
	return jobs
}

export const CREW_ROLES: Role[] = [
	{
		value: 'writing',
		label: 'Writing',
		jobs: [
			{
				value: 'screenwriter',
				label: 'Screenwriter',
			},
			{
				value: 'script writer',
				label: 'Script Writer',
			},
			{
				value: 'story writer',
				label: 'Story Writer',
			},
			{
				value: 'dialogue writer',
				label: 'Dialogue Writer',
			},
			{
				value: 'script editor',
				label: 'Script Editor',
			},
		],
	},
	{
		value: 'directing',
		label: 'Directing',
		jobs: [
			{
				value: 'director',
				label: 'Director',
			},
			{
				value: 'assistant director',
				label: 'Assistant Director',
			},
		],
	},
	{
		value: 'production',
		label: 'Production',
		jobs: [
			{
				value: 'producer',
				label: 'Producer',
			},
			{
				value: 'production manager',
				label: 'Production Manager',
			},
			{
				value: 'line producer',
				label: 'Line Producer',
			},
			{
				value: 'production coordinator',
				label: 'Production Coordinator',
			},
		],
	},
	{
		value: 'cinematography',
		label: 'Cinematography',
		jobs: [
			{
				value: 'cinematographer',
				label: 'Cinematographer',
			},
			{
				value: 'camera operator',
				label: 'Camera Operator',
			},
			{
				value: 'steadicam operator',
				label: 'Steadicam Operator',
			},
			{
				value: 'drone operator',
				label: 'Drone Operator',
			},
		],
	},
	{
		value: 'editing',
		label: 'Editing',
		jobs: [
			{
				value: 'editor',
				label: 'Editor',
			},
			{
				value: 'assistant editor',
				label: 'Assistant Editor',
			},
			{
				value: 'visual effects editor',
				label: 'Visual Effects Editor',
			},
			{
				value: 'sound editor',
				label: 'Sound Editor',
			},
		],
	},
	{
		value: 'art department',
		label: 'Art Department',
		jobs: [
			{
				value: 'production designer',
				label: 'Production Designer',
			},
			{
				value: 'art director',
				label: 'Art Director',
			},
			{
				value: 'set designer',
				label: 'Set Designer',
			},
			{
				value: 'prop master',
				label: 'Prop Master',
			},
			{
				value: 'costume designer',
				label: 'Costume Designer',
			},
			{
				value: 'costume supervisor',
				label: 'Costume Supervisor',
			},
			{
				value: 'makeup artist',
				label: 'Makeup Artist',
			},
			{
				value: 'hair stylist',
				label: 'Hair Stylist',
			},
			{
				value: 'set decorator',
				label: 'Set Decorator',
			},
			{
				value: 'storyboard artist',
				label: 'Storyboard Artist',
			},
		],
	},
	{
		value: 'sound department',
		label: 'Sound Department',
		jobs: [
			{
				value: 'sound designer',
				label: 'Sound Designer',
			},
			{
				value: 're-recording mixer',
				label: 'Re-recording Mixer',
			},
			{
				value: 'foley artist',
				label: 'Foley Artist',
			},
			{
				value: 'sound engineer',
				label: 'Sound Engineer',
			},
			{
				value: 'boom operator',
				label: 'Boom Operator',
			},
			{
				value: 'dialogue editor',
				label: 'Dialogue Editor',
			},
		],
	},
	{
		value: 'music department',
		label: 'Music Department',
		jobs: [
			{
				value: 'composer',
				label: 'Composer',
			},
			{
				value: 'music supervisor',
				label: 'Music Supervisor',
			},
			{
				value: 'orchestrator',
				label: 'Orchestrator',
			},
			{
				value: 'music editor',
				label: 'Music Editor',
			},
			{
				value: 'music producer',
				label: 'Music Producer',
			},
		],
	},
	{
		value: 'special effects department',
		label: 'Special Effects Department',
		jobs: [
			{
				value: 'special effects artist',
				label: 'Special Effects Artist',
			},
			{
				value: 'special effects supervisor',
				label: 'Special Effects Supervisor',
			},
			{
				value: 'practical effects artist',
				label: 'Practical Effects Artist',
			},
		],
	},
	{
		value: 'visual effects department',
		label: 'Visual Effects Department',
		jobs: [
			{
				value: 'visual effects artist',
				label: 'Visual Effects Artist',
			},
			{
				value: 'visual effects supervisor',
				label: 'Visual Effects Supervisor',
			},
			{
				value: 'compositor',
				label: 'Compositor',
			},
			{
				value: 'matte painter',
				label: 'Matte Painter',
			},
			{
				value: 'motion graphics artist',
				label: 'Motion Graphics Artist',
			},
		],
	},
	{
		value: 'stunt department',
		label: 'Stunt Department',
		jobs: [
			{
				value: 'stunt performer',
				label: 'Stunt Performer',
			},
			{
				value: 'stunt rigger',
				label: 'Stunt Rigger',
			},
		],
	},
	{
		value: 'casting department',
		label: 'Casting Department',
		jobs: [
			{
				value: 'casting director',
				label: 'Casting Director',
			},
			{
				value: 'casting assistant',
				label: 'Casting Assistant',
			},
		],
	},
	{
		value: 'location department',
		label: 'Location Department',
		jobs: [
			{
				value: 'location manager',
				label: 'Location Manager',
			},
			{
				value: 'location scout',
				label: 'Location Scout',
			},
		],
	},
	{
		value: 'script department',
		label: 'Script Department',
		jobs: [
			{
				value: 'script supervisor',
				label: 'Script Supervisor',
			},
			{
				value: 'script reader',
				label: 'Script Reader',
			},
		],
	},
	{
		value: 'grip and electric department',
		label: 'Grip and Electric Department',
		jobs: [
			{
				value: 'grip',
				label: 'Grip',
			},
			{
				value: 'best boy grip',
				label: 'Best Boy Grip',
			},
			{
				value: 'gaffer',
				label: 'Gaffer',
			},
			{
				value: 'best boy electric',
				label: 'Best Boy Electric',
			},
			{
				value: 'electrician',
				label: 'Electrician',
			},
			{
				value: 'generator operator',
				label: 'Generator Operator',
			},
		],
	},
	{
		value: 'production office',
		label: 'Production Office',
		jobs: [
			{
				value: 'production assistant',
				label: 'Production Assistant',
			},
			{
				value: 'unit production manager',
				label: 'Unit Production Manager',
			},
			{
				value: 'production accountant',
				label: 'Production Accountant',
			},
			{
				value: 'script coordinator',
				label: 'Script Coordinator',
			},
		],
	},
	{
		value: 'post-production department',
		label: 'Post-production Department',
		jobs: [
			{
				value: 'post-production supervisor',
				label: 'Post-production Supervisor',
			},
			{
				value: 'colorist',
				label: 'Colorist',
			},
			{
				value: 'vfx editor',
				label: 'VFX Editor',
			},
			{
				value: 'sound post production',
				label: 'Sound Post Production',
			},
		],
	},
	{
		value: 'marketing and publicity department',
		label: 'Marketing and Publicity Department',
		jobs: [
			{
				value: 'marketing coordinator',
				label: 'Marketing Coordinator',
			},
			{
				value: 'publicity manager',
				label: 'Publicity Manager',
			},
			{
				value: 'social media specialist',
				label: 'Social Media Specialist',
			},
		],
	},
	{
		value: 'distribution department',
		label: 'Distribution Department',
		jobs: [
			{
				value: 'distribution manager',
				label: 'Distribution Manager',
			},
			{
				value: 'sales representative',
				label: 'Sales Representative',
			},
		],
	},
]

export const CAST_ROLES: Role[] = [
	{
		value: 'acting',
		label: 'Acting',
		jobs: [
			{
				value: 'actor',
				label: 'Actor',
			},
			{
				value: 'actress',
				label: 'Actress',
			},
			{
				value: 'voice actor',
				label: 'Voice Actor',
			},
			{
				value: 'voice actress',
				label: 'Voice Actress',
			},
		],
	},
]

export const MEDIA_ROLES = CAST_ROLES.concat(CREW_ROLES)

export const SITES = [
	{
		label: 'YouTube',
		value: 'youtube',
	},
	{
		label: 'Vimeo',
		value: 'vimeo',
	},
]

export const VIDEO_TYPES = [
	{
		label: 'Trailer',
		value: 'trailer',
	},
	{
		label: 'Teaser',
		value: 'teaser',
	},
	{
		label: 'Clip',
		value: 'clip',
	},
	{
		label: 'Featurette',
		value: 'featurette',
	},
	{
		label: 'Behind the Scenes',
		value: 'behind the scenes',
	},
	{
		label: 'Bloopers',
		value: 'bloopers',
	},
	{
		label: 'Interview',
		value: 'interview',
	},
]

export const PHOTO_TYPES = [
	{
		label: 'Poster',
		value: 'poster',
	},
	{
		label: 'Backdrop',
		value: 'backdrop',
	},
]

export const QUALITY = [
	{
		label: 'SD',
		value: 'sd',
	},
	{
		label: 'HD',
		value: 'hd',
	},
	{
		label: '4K',
		value: '4k',
	},
]

export const GENDERS = [
	{
		label: 'Male',
		value: 'male',
	},
	{
		label: 'Female',
		value: 'female',
	},
	{
		label: 'Other',
		value: 'other',
	},
]
export const GENRES = [
	'Action',
	'Adventure',
	'Comedy',
	'Drama',
	'Fantasy',
	'Horror',
	'Thriller',
	'Western',
	'Sci-Fi',
	'Romance',
	'Crime',
	'Animation',
	'Family',
	'Mystery',
	'War',
	'History',
	'Music',
	'Sport',
	'Biography',
	'Musical',
	'Film-Noir',
	'News',
	'Talk-Show',
	'Reality-TV',
	'Game-Show',
	'Adult',
]

export const FILM_RELEASE_TYPES = [
	{
		label: 'Premiere',
		value: 'premiere',
	},
	{
		label: 'Theatrical',
		value: 'theatrical',
	},
	{
		label: 'Digital',
		value: 'digital',
	},
	{
		label: 'Physical',
		value: 'physical',
	},
	{
		label: 'TV',
		value: 'tv',
	},
]

// NOTE: This is max file size
export const MAX_SIZE = 1024 * 1024 * 3 // 3MB

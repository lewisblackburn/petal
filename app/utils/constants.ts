export const LANGUAGES = [
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Español' },
	{ value: 'fr', label: 'Français' },
	{ value: 'de', label: 'Deutsch' },
	{ value: 'it', label: 'Italiano' },
	{ value: 'pt', label: 'Português' },
	{ value: 'ru', label: 'Русский' },
	{ value: 'zh', label: '中文' },
	{ value: 'ja', label: '日本語' },
	{ value: 'ko', label: '한국어' },
	{ value: 'ar', label: 'العربية' },
	{ value: 'tr', label: 'Türkçe' },
	{ value: 'pl', label: 'Polski' },
	{ value: 'nl', label: 'Nederlands' },
	{ value: 'sv', label: 'Svenska' },
	{ value: 'da', label: 'Dansk' },
	{ value: 'fi', label: 'Suomi' },
	{ value: 'no', label: 'Norsk' },
	{ value: 'hu', label: 'Magyar' },
	{ value: 'cs', label: 'Čeština' },
	{ value: 'ro', label: 'Română' },
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

export const MAX_SIZE = 1024 * 1024 * 3 // 3MB

type CrewRole = {
	value: string
	label: string
	jobs: {
		value: string
		label: string
	}[]
}

export function getAllJobs() {
	const jobs: CrewRole['jobs'] = []
	CREW_ROLES.forEach(department => {
		department.jobs.forEach(job => {
			jobs.push(job)
		})
	})
	return jobs
}

export function crewRolesWithActing() {
	const ACTING_ROLE = {
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
		],
	}

	return [ACTING_ROLE, ...CREW_ROLES]
}

export const CREW_ROLES: CrewRole[] = [
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

export const LANGUAGES = [
	{
		label: 'English',
		value: 'english',
	},
	{
		label: 'Spanish',
		value: 'spanish',
	},
	{
		label: 'French',
		value: 'french',
	},
	{
		label: 'German',
		value: 'german',
	},
	{
		label: 'Italian',
		value: 'italian',
	},
	{
		label: 'Japanese',
		value: 'japanese',
	},
	{
		label: 'Korean',
		value: 'korean',
	},
	{
		label: 'Chinese',
		value: 'chinese',
	},
	{
		label: 'Russian',
		value: 'russian',
	},
	{
		label: 'Portuguese',
		value: 'portuguese',
	},
	{
		label: 'Arabic',
		value: 'arabic',
	},
	{
		label: 'Dutch',
		value: 'dutch',
	},
	{
		label: 'Swedish',
		value: 'swedish',
	},
	{
		label: 'Turkish',
		value: 'turkish',
	},
	{
		label: 'Greek',
		value: 'greek',
	},
	{
		label: 'Polish',
		value: 'polish',
	},
	{
		label: 'Danish',
		value: 'danish',
	},
	{
		label: 'Norwegian',
		value: 'norwegian',
	},
	{
		label: 'Finnish',
		value: 'finnish',
	},
	{
		label: 'Hungarian',
		value: 'hungarian',
	},
	{
		label: 'Czech',
		value: 'czech',
	},
	{
		label: 'Slovak',
		value: 'slovak',
	},
	{
		label: 'Romanian',
		value: 'romanian',
	},
	{
		label: 'Bulgarian',
		value: 'bulgarian',
	},
	{
		label: 'Ukrainian',
		value: 'ukrainian',
	},
	{
		label: 'Hindi',
		value: 'hindi',
	},
	{
		label: 'Thai',
		value: 'thai',
	},
	{
		label: 'Indonesian',
		value: 'indonesian',
	},
	{
		label: 'Vietnamese',
		value: 'vietnamese',
	},
]

export const MAX_SIZE = 1024 * 1024 * 3 // 3MB

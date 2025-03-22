import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function slugify(id: string | string, str: string) {
    str = str.replace(/^\s+|\s+$/g, '')
    str = str.toLowerCase()
    str = str.replace(/[^a-z0-9 -]/g, '')
    str = str.replace(/\s+/g, '-')
    str = str.replace(/-+/g, '-')
    return `${id}-${str}`
}

async function main() {
    const createBuild = async (build: any) => {
        const { id: buildId, name } = await prisma.builds.create({
            data: build,
        })

        await prisma.builds.update({
            where: {
                id: buildId,
            },
            data: {
                slug: slugify(buildId, name),
            },
        })
        return buildId
    }

    const userId = (
        await prisma.user.create({
            data: {
                id: 'test-39a9-test-863b-test',
                name: 'test',
                preferred_username: 'test',
                given_name: 'test',
                family_name: 'test',
                email: 'test@gmail.com',
            },
        })
    ).id

    const buildId = await createBuild({
        name: 'Zerg Rush',
        description: 'Une stratégie ultra-agressive basée sur les Zerglings.',
        slug: 'zerg-rush',
        race: 'ZERG',
        v_race: 'TERRAN',
        is_public: true,
        userId,
    })

    await prisma.step.createMany({
        data: [
            {
                description: 'Envoyer les ouvriers récolter les minéraux',
                population: 12,
                timer: 0,
                position: 1,
                buildId,
            },
            {
                description: 'Construire un Extracteur et assigner 3 ouvriers',
                population: 13,
                timer: 20,
                position: 2,
                buildId,
            },
            {
                description: 'Construire une Piscine Génétique',
                population: 14,
                timer: 40,
                position: 3,
                buildId,
            },
            {
                description: 'Former 6 Zerglings dès que possible',
                population: 14,
                timer: 80,
                position: 4,
                buildId,
            },
            {
                description: "Envoyer les Zerglings attaquer l'ennemi",
                population: 14,
                timer: 120,
                position: 5,
                buildId,
            },
            {
                description: 'Continuer à produire des Zerglings',
                population: 16,
                timer: 140,
                position: 6,
                buildId,
            },
            {
                description: 'Construire une Reine pour injecter du mucus',
                population: 18,
                timer: 160,
                position: 7,
                buildId,
            },
            {
                description: 'Construire un deuxième Extracteur',
                population: 19,
                timer: 180,
                position: 8,
                buildId,
            },
            {
                description:
                    "Lancer l'amélioration de la vitesse des Zerglings",
                population: 20,
                timer: 200,
                position: 9,
                buildId,
            },
            {
                description: 'Construire une deuxième base',
                population: 21,
                timer: 220,
                position: 10,
                buildId,
            },
            {
                description: 'Produire encore plus de Zerglings',
                population: 22,
                timer: 240,
                position: 11,
                buildId,
            },
            {
                description: 'Scout avec un Zergling pour voir la base ennemie',
                population: 22,
                timer: 260,
                position: 12,
                buildId,
            },
            {
                description: "Lancer l'amélioration des attaques des Zerglings",
                population: 24,
                timer: 280,
                position: 13,
                buildId,
            },
            {
                description: "Construire une Chambre d'évolution",
                population: 24,
                timer: 300,
                position: 14,
                buildId,
            },
            {
                description: 'Créer une deuxième Reine pour la défense',
                population: 26,
                timer: 320,
                position: 15,
                buildId,
            },
            {
                description:
                    "Envoyer des Zerglings harceler l'économie ennemie",
                population: 26,
                timer: 340,
                position: 16,
                buildId,
            },
            {
                description:
                    'Construire une Reine supplémentaire pour la macro',
                population: 28,
                timer: 360,
                position: 17,
                buildId,
            },
            {
                description:
                    'Faire évoluer la Tanière pour débloquer les Cafards',
                population: 30,
                timer: 380,
                position: 18,
                buildId,
            },
            {
                description: 'Lancer la production de Cafards',
                population: 32,
                timer: 400,
                position: 19,
                buildId,
            },
            {
                description: 'Construire un troisième Extracteur',
                population: 34,
                timer: 420,
                position: 20,
                buildId,
            },
            {
                description:
                    'Envoyer des Zerglings explorer les points stratégiques',
                population: 36,
                timer: 440,
                position: 21,
                buildId,
            },
            {
                description: 'Améliorer les armures des unités terrestres',
                population: 38,
                timer: 460,
                position: 22,
                buildId,
            },
            {
                description: 'Construire un Terrier pour cacher les unités',
                population: 40,
                timer: 480,
                position: 23,
                buildId,
            },
            {
                description: 'Construire un Spire pour accéder aux Mutalisks',
                population: 42,
                timer: 500,
                position: 24,
                buildId,
            },
            {
                description: 'Former les premiers Mutalisks',
                population: 44,
                timer: 520,
                position: 25,
                buildId,
            },
            {
                description:
                    'Préparer une attaque combinée Zerglings + Mutalisks',
                population: 46,
                timer: 540,
                position: 26,
                buildId,
            },
            {
                description: 'Lancer une attaque massive',
                population: 48,
                timer: 560,
                position: 27,
                buildId,
            },
            {
                description:
                    'Produire des Overlords pour éviter le supply block',
                population: 50,
                timer: 580,
                position: 28,
                buildId,
            },
            {
                description: 'Construire une troisième base',
                population: 52,
                timer: 600,
                position: 29,
                buildId,
            },
            {
                description: 'Continuer la production de Mutalisks',
                population: 54,
                timer: 620,
                position: 30,
                buildId,
            },
            {
                description: 'Faire évoluer les Cafards en Cafards fouisseurs',
                population: 56,
                timer: 640,
                position: 31,
                buildId,
            },
            {
                description:
                    'Harceler les lignes de minerais ennemies avec les Mutalisks',
                population: 58,
                timer: 660,
                position: 32,
                buildId,
            },
            {
                description: 'Préparer une attaque finale',
                population: 60,
                timer: 680,
                position: 33,
                buildId,
            },
            {
                description: 'Maximiser la production de troupes',
                population: 62,
                timer: 700,
                position: 34,
                buildId,
            },
            {
                description: "Achever l'adversaire avec une armée complète",
                population: 64,
                timer: 720,
                position: 35,
                buildId,
            },
        ],
    })

    const builds = [
        {
            name: 'Marine Tank Push',
            description: 'Un push puissant basé sur Marines et Tanks.',
            slug: 'marine-tank-push',
            race: 'TERRAN',
            v_race: 'ZERG',
            is_public: true,
            userId,
        },
        {
            name: 'Cannon Rush',
            description: 'Une stratégie basée sur le proxy de Photons Cannons.',
            slug: 'cannon-rush',
            race: 'PROTOSS',
            v_race: 'TERRAN',
            is_public: true,
            userId,
        },
        {
            name: 'Roach Ravager All-in',
            description: 'Un all-in basé sur les Roachs et Ravagers.',
            slug: 'roach-ravager-all-in',
            race: 'ZERG',
            v_race: 'PROTOSS',
            is_public: true,
            userId,
        },
        {
            name: 'Dark Templar Rush',
            description: 'Une ouverture rapide sur Dark Templars.',
            slug: 'dark-templar-rush',
            race: 'PROTOSS',
            v_race: 'ZERG',
            is_public: true,
            userId,
        },
        {
            name: 'Banshee Harass',
            description: 'Un harass basé sur des Banshees invisibles.',
            slug: 'banshee-harass',
            race: 'TERRAN',
            v_race: 'PROTOSS',
            is_public: true,
            userId,
        },
        {
            name: 'Swarm Host Nydus',
            description: 'Une stratégie basée sur Swarm Hosts et le Nydus.',
            slug: 'swarm-host-nydus',
            race: 'ZERG',
            v_race: 'TERRAN',
            is_public: true,
            userId,
        },
        {
            name: 'Colossus Deathball',
            description:
                'Une composition de fin de partie avec Colossus et Gateway units.',
            slug: 'colossus-deathball',
            race: 'PROTOSS',
            v_race: 'ALL',
            is_public: true,
            userId,
        },
        {
            name: 'Battlecruiser Rush',
            description: 'Un rush rapide basé sur les Battlecruisers.',
            slug: 'battlecruiser-rush',
            race: 'TERRAN',
            v_race: 'ZERG',
            is_public: true,
            userId,
        },
        {
            name: 'Ling Bane All-in',
            description: 'Une attaque tout-en-un avec Zerglings et Banelings.',
            slug: 'ling-bane-all-in',
            race: 'ZERG',
            v_race: 'TERRAN',
            is_public: true,
            userId,
        },
        {
            name: 'Proxy Barracks Reaper',
            description: 'Une ouverture aggressive avec des Reapers.',
            slug: 'proxy-barracks-reaper',
            race: 'TERRAN',
            v_race: 'PROTOSS',
            is_public: true,
            userId,
        },
    ]

    for (let index = 0; index < builds.length; index++) {
        const element = builds[index]
        await createBuild(element)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { categoryId: 1 },
    update: {},
    create: {
      title: 'Ремонт',
      tasks: {
        create: [
          {
            title: 'Вкрутить лампочку',
            userId: '1',
            description: 'Перегорела лампочка, темно и страшно.',
              price: 100,
            dueDate: new Date('2023-05-14'),
            city: 'Moscow',
            status: 'New',
            tags: {
              create: [
                {name: 'электрика'}
              ]
            }
          },
        ]
      },
    }
  });
  await prisma.category.upsert({
    where: { categoryId: 2 },
    update: {},
    create: {
      title: 'Доставка',
      tasks: {
        create: [
          {
            title: 'Доставить пиццу',
            userId: '2',
            description: 'Кушать охота, в холодильнике мышь повесилась.',
            price: 1000,
            dueDate: new Date('2023-05-25'),
            city: 'Moscow',
            status: 'New',
          },
          {
            title: 'Увезти тещу.',
            userId: '3',
            description: 'Куда угодно, скорее.',
            price: 1000000,
            dueDate: new Date(),
            city: 'Moscow',
            status: 'New',
            tags: {
              create: [
                {name: 'разовая'},
                {name: 'опасная'}
              ]
            }
          },
        ]
      },
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })

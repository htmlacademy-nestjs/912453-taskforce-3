const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.review.upsert({
    where: { id: 1 },
    update: {},
    create:
      {
        review: 'Мастер-ломастер',
        taskId: 1,
        rating: 2,
        userId: '111',
        contractorId: '222'
      },
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

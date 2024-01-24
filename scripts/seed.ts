import config from '@/lib/server/config';
import { getClient } from '@/lib/server/db';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';

async function seed() {
  console.log(config.POSTGRES_URL);

  const client = getClient();
  await client.connect();

  await client.query('begin');

  try {
    const saltRounds = 10;
    const hashedPassword = await hash('password', saltRounds);

    console.log('Creating demo user');
    await client.query(
      'insert into users (username, password) values ($1, $2) on conflict do nothing',
      ['demo', hashedPassword]
    );

    const demoUserRes = await client.query("select id from users where username = 'demo'");

    const demoUser = demoUserRes.rows[0];

    for (let i = 0; i < 10; i++) {
      console.log('Creating note for demo user');
      await client.query('insert into notes (user_id, title, content) values ($1, $2, $3)', [
        demoUser.id,
        faker.lorem.sentence(),
        faker.lorem.sentences(),
      ]);
    }

    for (let i = 0; i < 10; i++) {
      console.log(`Creating user ${i}`);
      await client.query('insert into users (username, password) values ($1, $2)', [
        faker.internet.userName(),
        faker.internet.password(),
      ]);
    }

    const usersRes = await client.query('select id from users order by created_at desc limit 10');

    for (const row of usersRes.rows) {
      for (let i = 0; i < 10; i++) {
        console.log(`Creating note ${i} for user ${row.id}`);
        await client.query('insert into notes (user_id, title, content) values ($1, $2, $3)', [
          row.id,
          faker.lorem.sentence(),
          faker.lorem.sentences(),
        ]);
      }
    }

    await client.query('commit');
  } catch (err) {
    await client.query('rollback');
    console.log(err);
  } finally {
    await client.end();
  }
}

seed();

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/challenge.entity';
import { Repository } from 'typeorm';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
  ) {}
  create(createChallengeDto: CreateChallengeDto) {
    const newChallenge = this.challengeRepository.create(createChallengeDto);
    return this.challengeRepository.save(newChallenge);
  }

  findAll() {
    return this.challengeRepository.find();
  }

  async findUserInfo(id: number) {
    return await this.challengeRepository.query(
      `select * from (select *, RANK () OVER ( 
        PARTITION BY t1.challenge ORDER BY likes DESC
    ) rank from (
	select ct.id, ct.user_id, ct.challenge, ct.likes, ct.image_url, cl.name, cl.tags 
	from contents as ct
	left join challenge as cl 
	on cl.id = ct.challenge
) as t1) as t2
where t2.user_id = ${id}`,
    );
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    const updatedChallenge =
      this.challengeRepository.create(updateChallengeDto);
    return this.challengeRepository.update(id, updatedChallenge);
  }

  async remove(id: number) {
    await this.challengeRepository.delete(id);
  }
}

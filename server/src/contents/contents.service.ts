import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from 'src/typeorm/contents.entity';
import { View } from 'src/typeorm/view.entity';
import { Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
// import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Contents)
    private readonly contentsRepository: Repository<Contents>,
    @InjectRepository(View)
    private readonly viewRepository: Repository<View>,
  ) {}
  create(createContentDto: CreateContentDto) {
    const newContent = this.contentsRepository.create(createContentDto);
    return this.contentsRepository.save(newContent);
  }

  async findAll() {
    // return this.contentsRepository.find();
    return await this.viewRepository.query(
      `select cu.*, cha.name, cha.tags 
      from (select con.*, u.firstname, u.lastname 
        from contents as con 
        left join users as u on con.user_id = u.id) as cu 
        left join challenge as cha on cu.challenge = cha.id`,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  async update(id: number, likes: CreateContentDto) {
    const newLikes = this.contentsRepository.create(likes);
    return await this.contentsRepository.query(
      `update contents set likes = ${newLikes.likes} where user_id = ${id}`,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}

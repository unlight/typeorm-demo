import {Table, Column, PrimaryGeneratedColumn} from "typeorm";
import {ManyToOne} from "typeorm";
import { Author } from './author';

@Table()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    fileName: string;

    @Column()
    views: number;

    @Column()
    isPublished: boolean;
    
    @ManyToOne(type => Author, author => author.photos)
    author: Author;
}
import {Table, Column, PrimaryGeneratedColumn} from "typeorm";

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
}
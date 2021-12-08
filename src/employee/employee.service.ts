import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { EmployeeEntity } from 'src/models/employees/Employee.entity';
import { EmployeeInterface } from 'src/models/employees/Employee.interface';
import { Between, Like, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
    ){}

    public async getEmployees(paginationQuery:PaginationQuery):Promise<EmployeeInterface[]> {
        const {page,limit}=paginationQuery;
        if(isEmpty(limit)||isEmpty(page))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,NUMBER,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.employeeRepository.find({
                    where:[
                        {ci:Like(`%${search}%`)},
                        {civilStatus:Like(`%${search}%`)},
                        {employedName:Like(`%${search}%`)},
                        {lastName1:Like(`%${search}%`)},
                        {lastName2:Like(`%${search}%`)},
                        {mobile:Like(`%${search}%`)},
                        {description:Like(`%${search}%`)},
                        {placeOfBirth:Like(`%${search}%`)},
                    ],
                    skip,
                    take:limit
                });
            case NUMBER:           
                return await this.employeeRepository.find({
                    where:[
                        {nit:search},
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.employeeRepository.find({
                    where: [
                        {
                            dateOfAdmission: Between(
                                date1.toISOString(),
                                date2.toISOString(),
                            ),
                        },
                        {
                            dateOfBirth: Between(
                                date1.toISOString(),
                                date2.toISOString(),
                            ),
                        }
                    ],
                    skip,
                    take:limit
                });
            case NONE:
                return await this.employeeRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async createEmployee(dto: CreateEmployeeDto):Promise<EmployeeEntity>{

        const employeeExist: EmployeeEntity = await this.employeeRepository.findOne({ ci:dto.ci });

        if(employeeExist)throw new BadRequestException('El empleado ya existe');

        const newEmployee: EmployeeEntity = this.employeeRepository.create(dto);

        return await this.employeeRepository.save(newEmployee);
    }

}

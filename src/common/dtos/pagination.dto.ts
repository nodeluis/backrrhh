import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationQuery {
    @ApiProperty({
      minimum: 1,
      maximum: 10000,
      title: 'Page',
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      format: 'int32',
      default: 1
    })
    page: number;

    @ApiProperty()
    limit: number;

    @ApiPropertyOptional()
    search:string;

    @ApiPropertyOptional()
    range1:Date;

    @ApiPropertyOptional()
    range2:Date;
    /*@ApiProperty({
        name: '_sortBy'
    })
    sortBy: string[];*/

    /*@ApiProperty({
        enum: LettersEnum,
        enumName: 'LettersEnum'
    })
    enum: LettersEnum;*/
  
    /*@ApiProperty({
        enum: LettersEnum,
        enumName: 'LettersEnum',
        isArray: true
    })
    enumArr: LettersEnum;
  
    @ApiProperty()
    beforeDate: Date;
  
    @ApiProperty({
        type: 'object',
        additionalProperties: true
    })
    filter: Record<string, any>;
  
    static _OPENAPI_METADATA_FACTORY() {
        return {
            sortBy: { type: () => [String] }
        };
    }*/
}
import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from '@libs/db/models/category.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Crud({
  model: Category,
})
@Controller('category')
@ApiTags('站点分类')
export class CategoryController {
  // 注入数据模型
  constructor(@InjectModel(Category) private readonly model) {}

  @Get('option')
  option() {
    return {
      title: '分类管理',
      defaultSort: {
        prop: 'orderNum',
        order: 'descending',
      },
      column: [
        {
          prop: 'name',
          label: '类别名称',
          sortable: true,
          search: true,
          regex: true,
          span: 24,
          row: true,
        },
        {
          prop: 'icofont',
          label: '类别ico',
          type: 'icon',
          width: 120,
          iconList: [
            {
              label: '阿里云图标',
              list: [],
            },
            {
              label: '基本图标',
              list: [
                {
                  label: '名称2',
                  value: 'el-icon-error',
                },
              ],
            },
          ],
        },
        {
          prop: 'orderNum',
          label: '排序序号',
          type: 'number',
          sortable: true,
          span: 12,
        },
      ],
    };
  }
}

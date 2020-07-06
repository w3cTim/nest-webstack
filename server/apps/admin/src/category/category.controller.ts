import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from '@libs/db/models/category.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

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
              label: '基本图标',
              list: [
                {
                  label: '名称1',
                  value: 'el-icon-info',
                },
                {
                  label: '名称2',
                  value: 'el-icon-error',
                },
              ],
            },
            {
              label: '阿里云图标',
              list: [
                'iconfont icon-zhongyingwen',
                'iconfont icon-rizhi1',
                'iconfont icon-bug',
                'iconfont icon-qq1',
                'iconfont icon-weixin1',
              ],
            },
          ],
        },
      ],
    };
  }
}

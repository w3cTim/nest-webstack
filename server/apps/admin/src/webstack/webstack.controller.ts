import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { WebStack } from '@libs/db/models/webstack.model';
import { Category } from '@libs/db/models/category.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Crud({
  model: WebStack,
})
@Controller('webstack')
@ApiTags('站点管理')
export class WebstackController {
  // 注入数据模型
  constructor(
    @InjectModel(WebStack)
    private readonly model: ReturnModelType<typeof WebStack>,
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  @Get('option')
  async option() {
    const category = (await this.categoryModel.find()).map(v => ({
      label: v.name,
      value: v._id,
    }));
    return {
      title: '站点管理',
      translate: false,
      defaultSort: {
        prop: 'createdAt',
        order: 'descending',
      },
      column: [
        {
          prop: 'name',
          label: '名称',
          sortable: true,
          search: true,
          regex: true, //正则匹配，模糊搜索
          span: 24,
          row: true,
        },
        {
          prop: 'url',
          type: 'url',
          alone: true,
          label: '网址',
          search: true,
          regex: true,
          span: 24,
          row: true,
        },
        {
          prop: 'category',
          label: '所属分类',
          sortable: true,
          type: 'select',
          dicData: category,
          search: true,
          row: true,
        },
        { prop: 'descript', label: '描述', span: 24 },
        {
          prop: 'logo',
          label: '图标',
          type: 'upload',
          action: 'upload',
          span: 24,

          propsHttp: {
            // res: 'url',
            url: 'url',
            name: 'filename',
          },
          isString: true,
          width: '100px',
          accept: [
            'image/png',
            'image/jpg',
            'image/jpeg',
            'image/x-icon',
            'image/svg+xml',
            'image/gif',
            'image/webp',
          ],
          listType: 'picture-img',
          multiple: false,
          tip: '只能上传 jpg/png/gif/ico/webp/svg 文件',
        },
        { prop: 'keyword', label: '关键字', span: 24 },
        {
          prop: 'orderNum',
          label: '排序序号',
          type: 'number',
          sortable: true,
          span: 12,
        },
        {
          prop: 'count',
          label: '访问次数',
          span: 12,
          editDetail: true,
          addDisplay: false,
        },
        {
          prop: 'createdAt',
          label: '创建日期',
          span: 12,
          editDetail: true,
          addDisplay: false,
        },
        {
          prop: 'updatedAt',
          label: '修改日期',
          span: 12,
          editDetail: true,
          addDisplay: false,
        },
      ],
    };
  }
}

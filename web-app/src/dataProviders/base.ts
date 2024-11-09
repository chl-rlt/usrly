import {
  type DeleteParams,
  type DataProvider,
  type DeleteResult,
  type RaRecord,
  type DeleteManyParams,
  type DeleteManyResult,
  type SortPayload,
  type GetListResult,
  type GetListParams,
} from "react-admin";
import { simpleRestProvider } from "./simpleRestProvider";
import { stringify } from "query-string";
import { httpClient } from "./httpClient";
import { getPrefixedResource } from "./prefixes";

/**
 * Inherited from react-admin simple rest provider
 *
 * Key differences:
 *  - handle prefixing for specific resource and operation
 *  - getList, getMany, getManyReference select collection on "results" property*
 *  - getList doesn't use header "Content-Range"
 *  - Some other
 */
export const baseDataProvider: DataProvider = {
  // Override to not use "Content-Range" header
  getList: async (resource, params) => {
    const prefixedResource = getPrefixedResource(resource);
    return await getListItems(prefixedResource, params);
  },
  getMany: async (resource, params) => {
    const prefixedResource = getPrefixedResource(resource);
    return await getListItems(prefixedResource, {
      filter: { ids: params.ids },
      pagination: { perPage: 1500, page: 1 },
    });
  },
  async getManyReference(resource, params) {
    const prefixedResource = getPrefixedResource(resource);
    const paramsFilter = {
      ...params.filter,
      [params.target]: params.id,
    };
    params.filter = paramsFilter;
    return await getListItems(prefixedResource, { ...params });
  },

  getOne: async (resource, params) => {
    const prefixedResource = getPrefixedResource(resource);
    return await simpleRestProvider.getOne(prefixedResource, params);
  },
  create: async (resource, params) => {
    const prefixedResource = getPrefixedResource(resource);
    const result = await simpleRestProvider.create(prefixedResource, params);
    return { data: { ...params.data, ...result.data } };
  },
  update: async (resource, params) => {
    const prefixedResource = getPrefixedResource(resource);
    const result = await simpleRestProvider.update(prefixedResource, params);
    return { data: { ...params.data, ...result.data } };
  },
  async updateMany(resource, params) {
    const prefixedResource = getPrefixedResource(resource);
    return await simpleRestProvider.updateMany(prefixedResource, params);
  },

  delete: deleteItem,
  async deleteMany(
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> {
    const promises = params.ids.map(
      async (id) => await this.delete(resource, { id })
    );
    const data = await Promise.all(promises);
    return { data: data.map((d) => d.data) };
  },
};

async function deleteItem(
  resource: string,
  params: DeleteParams<RaRecord>
): Promise<DeleteResult> {
  const prefixedResource = getPrefixedResource(resource);
  await httpClient(`/${prefixedResource}/${params.id}`, {
    method: "DELETE",
  });
  return { data: { id: params.id } };
}

const handleSort = (sort: SortPayload) => {
  const { field, order } = sort;
  const mappedOrder = order === "DESC" ? "-" : "";
  const ordering =
    field == null || field === "" ? undefined : `${mappedOrder}${field}`;

  return ordering;
};

export async function getListItems(
  resource: string,
  params: Partial<GetListParams>
): Promise<GetListResult> {
  const page =
    params.pagination?.page != null ? params.pagination?.page : undefined;
  const ordering = params.sort != null ? handleSort(params.sort) : undefined;
  const limit = params.pagination?.perPage;

  const query = { ...params.filter, page, ordering, limit };

  const url = `/${resource}?${stringify(query)}`;
  const { json } = await httpClient(url);
  const results = json?.results ?? [];
  const total = json?.count ?? results.length;
  return {
    data: results,
    total,
  };
}

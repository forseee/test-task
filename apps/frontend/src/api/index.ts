import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
});

export type IResponce<DataType> = {
  total: number;
  page: number;
  pageSize: number;
  results: Array<DataType>;
};

export type GetAdsParams = {
  minPrice: number;
  maxPrice: number;
  search: string;
  city: string;
  district: string;
};

export type IImage = {
  id: string;
  image: string;
  thumbnail: string;
  user: string;
}

export type IAd = {
  id: string;
  title: string;
  description: string | TrustedHTML;
  city_name: string;
  district_name: string;
  created_at: string;
  views: number;
  user: string;
  price: number;
  images: Array<IImage>
};

export const getAds = (
  params?: Partial<GetAdsParams>
): Promise<AxiosResponse<IResponce<IAd>>> =>
  instance.get('/api/ads', {
    params,
  });

export const getAdDetails = (
  params: Partial<GetAdsParams>
): Promise<AxiosResponse<IResponce<IAd>>> =>
  instance.get('/api/ads', {
    params,
  });

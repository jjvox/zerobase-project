export interface caruselDataType {
  id: number;
  title: string;
  description: string;
  link: string;
  img: string;
}

const caruselData: caruselDataType[] = [
  {
    id: 0,
    title: "물빠진 청바지!",
    description: "이제 막 도착한 패션 청바지를 만나보세요.",
    link: "grocery",
    img: "/assets/image/img_shop_fashion.jpeg",
  },
  {
    id: 1,
    title: "신속한 업무처리!",
    description: "다양한 디지털 상품을 둘러보세요.",
    link: "digital",
    img: "/assets/image/img_shop_digital.jpeg",
  },
  {
    id: 2,
    title: "신선한 식품!",
    description: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
    link: "grocery",
    img: "/assets/image/img_shop_grocery.jpeg",
  },
];

export default caruselData;

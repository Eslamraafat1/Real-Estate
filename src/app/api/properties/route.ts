import { NextRequest, NextResponse } from 'next/server';
import { properties } from '@/data/properties';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const type = searchParams.get('type');
  const city = searchParams.get('city');
  const status = searchParams.get('status');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const bedrooms = searchParams.get('bedrooms');
  const featured = searchParams.get('featured');
  const id = searchParams.get('id');

  let filtered = [...properties];

  if (id) {
    const property = filtered.find((p) => p.id === parseInt(id));
    if (property) {
      return NextResponse.json(property);
    }
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  if (type) {
    filtered = filtered.filter((p) => p.type === type);
  }

  if (city) {
    filtered = filtered.filter((p) => p.city === city);
  }

  if (status) {
    filtered = filtered.filter((p) => p.status === status);
  }

  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= parseInt(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));
  }

  if (bedrooms) {
    filtered = filtered.filter((p) => p.bedrooms >= parseInt(bedrooms));
  }

  if (featured === 'true') {
    filtered = filtered.filter((p) => p.featured);
  }

  return NextResponse.json(filtered);
}

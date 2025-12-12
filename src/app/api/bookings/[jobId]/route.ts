import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  // Mock data simulation based on jobId to allow testing different states
  // ID ending in 1 -> REQUESTED
  // ID ending in 2 -> ASSIGNED
  // ID ending in 3 -> IN_PROGRESS
  // ID ending in 4 -> COMPLETED
  
  let status = 'REQUESTED';
  let progress = 25;
  
  if (jobId.endsWith('2')) {
    status = 'ASSIGNED';
    progress = 50;
  } else if (jobId.endsWith('3')) {
    status = 'IN_PROGRESS';
    progress = 75;
  } else if (jobId.endsWith('4')) {
    status = 'COMPLETED';
    progress = 100;
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    id: jobId,
    status,
    progress,
    serviceType: 'Plumbing Repair',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    worker: status !== 'REQUESTED' ? {
      name: 'Dawit Alemu',
      phone: '+251 911 223344',
      rating: 4.9,
      avatar: 'https://i.pravatar.cc/150?u=dawit'
    } : null
  });
}

using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity{
    public class Command : IRequest
    {
         public required string Id { get; set; }
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.Id], cancellationToken)
                   ?? throw new Exception("Cannot find Activity");

            mapper.Map(request.ActivityDto, activity);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}

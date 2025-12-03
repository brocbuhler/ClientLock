using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ClientLock.Models;
using Microsoft.AspNetCore.Identity;
using ClientLock.models;

namespace ClientLock.Data;
public class ClientLockDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<Agent> Agents { get; set; }
    public DbSet<AgentLawPractice> AgentLawPractices { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<LawPractice> LawPractices { get; set; }
    public DbSet<Meeting> Meetings { get; set; }

    public DbSet<UserProfile> UserProfiles { get; set; }

    public ClientLockDbContext(DbContextOptions<ClientLockDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(
        
            new IdentityRole {Id = "AgentRole1", Name = "Agent", NormalizedName = "Agent"},
            new IdentityRole {Id = "ClientRole1", Name = "Client", NormalizedName = "Client"}
        );

        modelBuilder.Entity<IdentityUser>().HasData(

            new IdentityUser
            {
                Id = "A-001",
                UserName = "TomRLaw",
                Email = "tom@clientlock.com",
                PasswordHash = new PasswordHasher<IdentityUser>()
                    .HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "A-002",
                UserName = "SarahLaw",
                Email = "sarah@clientlock.com",
                PasswordHash = new PasswordHasher<IdentityUser>()
                    .HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "A-003",
                UserName = "MikeLaw",
                Email = "mike@clientlock.com",
                PasswordHash = new PasswordHasher<IdentityUser>()
                    .HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "C-001",
                UserName = "GeroldG",
                Email = "gerold@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>()
                    .HashPassword(null, _configuration["ClientPassword"])
            },
            new IdentityUser
            {
                Id = "C-002",
                UserName = "AmandaP",
                Email = "amanda@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>()
                    .HashPassword(null, _configuration["ClientPassword"])
            }
        );


        modelBuilder.Entity<IdentityUserRole<string>>().HasData(

          new IdentityUserRole<string>
          {
              RoleId = "AgentRole1",
              UserId = "A-001"
          },
          new IdentityUserRole<string>
          {
              RoleId = "AgentRole1",
              UserId = "A-002"
          },
          new IdentityUserRole<string>
          {
              RoleId = "AgentRole1",
              UserId = "A-003"
          },
          new IdentityUserRole<string>
          {
              RoleId = "ClientRole1",
              UserId = "C-001"
          },
          new IdentityUserRole<string>
          {
              RoleId = "ClientRole1",
              UserId = "C-002"
          }
        );

        modelBuilder.Entity<UserProfile>().HasData(

            new UserProfile { Id = 1, IdentityUserId = "A-001" },
            new UserProfile { Id = 2, IdentityUserId = "A-002" },
            new UserProfile { Id = 3, IdentityUserId = "A-003" },
            new UserProfile { Id = 4, IdentityUserId = "C-001" },
            new UserProfile { Id = 5, IdentityUserId = "C-002" }
        );

        modelBuilder.Entity<Agent>().HasData(

            new Agent
            {
                Id = 1,
                FirstName = "Thomas",
                LastName = "Riley",
                UserProfileId = 1,
                Phone = "6151112222",
                Email = "tom@clientlock.com",
                Image = "https://example.com/agent1.jpg"
            },
            new Agent
            {
                Id = 2,
                FirstName = "Sarah",
                LastName = "Nguyen",
                UserProfileId = 2,
                Phone = "6153334444",
                Email = "sarah@clientlock.com",
                Image = "https://example.com/agent2.jpg"
            },
            new Agent
            {
                Id = 3,
                FirstName = "Mike",
                LastName = "Jordan",
                UserProfileId = 3,
                Phone = "6155556666",
                Email = "mike@clientlock.com",
                Image = "https://example.com/agent3.jpg"
            }
        );

        modelBuilder.Entity<Client>().HasData(

            new Client
            {
                Id = 1,
                FirstName = "Gerold",
                LastName = "Green",
                AgentId = 1,
                UserProfileId = 4,
                Phone = "6157778888",
                Email = "gerold@gmail.com"
            },
            new Client
            {
                Id = 2,
                FirstName = "Amanda",
                LastName = "Parker",
                AgentId = 2,
                UserProfileId = 5,
                Phone = "6159990000",
                Email = "amanda@gmail.com"
            }
        );

        modelBuilder.Entity<LawPractice>().HasData(

            new LawPractice { Id = 1, Type = "Family Law", Description = "Divorce and custody" },
            new LawPractice { Id = 2, Type = "Criminal Defense", Description = "Criminal cases" },
            new LawPractice { Id = 3, Type = "Personal Injury", Description = "Accident claims" },
            new LawPractice { Id = 4, Type = "Estate Planning", Description = "Wills and trusts" }
        );

        modelBuilder.Entity<AgentLawPractice>().HasData(
            new AgentLawPractice { Id = 1, AgentId = 1, LawPracticeId = 1 },
            new AgentLawPractice { Id = 2, AgentId = 1, LawPracticeId = 2 },
            new AgentLawPractice { Id = 3, AgentId = 2, LawPracticeId = 2 },
            new AgentLawPractice { Id = 4, AgentId = 2, LawPracticeId = 3 },
            new AgentLawPractice { Id = 5, AgentId = 3, LawPracticeId = 3 },
            new AgentLawPractice { Id = 6, AgentId = 3, LawPracticeId = 4 }
        );

        modelBuilder.Entity<Meeting>().HasData(

            new Meeting
            {
                Id = 1,
                MeetingTime = new DateTime(2025, 12, 30),
                AgentId = 1,
                ClientId = 1,
                LawPracticeId = 2,
                ConsultingOn = "DUI charge"
            }
        );
    }
}

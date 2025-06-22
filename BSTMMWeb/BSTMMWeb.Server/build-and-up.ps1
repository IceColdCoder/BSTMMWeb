param($Configuration)
dotnet build BSTMMWeb.Server.csproj -c $Configuration
docker-compose -f docker-compose.yml up --build -d

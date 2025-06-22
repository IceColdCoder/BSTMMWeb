# Stage 0: Build Angular + .NET
FROM mcr.microsoft.com/dotnet/sdk:8.0-windowsservercore-ltsc2019 AS build

# Set working directory inside container
WORKDIR /src

# Build args and environment
ARG Configuration=Release
ENV Configuration=${Configuration}
ENV ASPNETCORE_ENVIRONMENT=Production
# Switch to Development for Debug
RUN IF /I "%Configuration%"=="Debug" (setx ASPNETCORE_ENVIRONMENT "Development")

# Install Node.js manually for Angular CLI
RUN curl -L -o node.zip https://nodejs.org/dist/v18.19.1/node-v18.19.1-win-x64.zip \
    && powershell -Command "Expand-Archive -Path node.zip -DestinationPath C:\node"
USER ContainerAdministrator
RUN setx /M PATH "C:\node\node-v18.19.1-win-x64;%PATH%"
USER ContainerUser
RUN npm install -g @angular/cli

# Copy project files for restore (paths are relative to build context root)
COPY ["BSTMMWeb.Server/BSTMMWeb.Server.csproj", "BSTMMWeb.Server/"]
COPY ["bstmmweb.client/package.json", "bstmmweb.client/"]
COPY ["bstmmweb.client/package-lock.json", "bstmmweb.client/"]

# Restore .NET dependencies
WORKDIR /src/BSTMMWeb.Server
RUN dotnet restore "BSTMMWeb.Server.csproj"

# Copy the remaining source code
WORKDIR /src
COPY . .

# Build Angular and output to ASP.NET Core wwwroot
WORKDIR /src/bstmmweb.client
RUN npm install \
    && npm run build -- --output-path=../BSTMMWeb.Server/wwwroot

# Publish .NET app
WORKDIR /src/BSTMMWeb.Server
RUN dotnet publish "BSTMMWeb.Server.csproj" -c %Configuration% -o /app/publish /p:UseAppHost=false

# Stage 1: Runtime image (Kestrel self-host)
FROM mcr.microsoft.com/dotnet/aspnet:8.0-windowsservercore-ltsc2019 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expose ports and set URLs
EXPOSE 8080
EXPOSE 8081

# Start the application
ENTRYPOINT ["dotnet", "BSTMMWeb.Server.dll"]




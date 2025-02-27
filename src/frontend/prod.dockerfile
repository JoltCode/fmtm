FROM docker.io/node:18 as builder
ARG MAINTAINER=admin@hotosm.org

ARG APP_VERSION
ARG API_URL
ENV API_URL="${API_URL}"
ARG FRONTEND_MAIN_URL
ENV FRONTEND_MAIN_URL="${FRONTEND_MAIN_URL}"

LABEL org.hotosm.fmtm.app-name="fmtm-frontend" \
      org.hotosm.fmtm.app-version="${APP_VERSION}" \
      org.hotosm.fmtm.maintainer="${MAINTAINER}" \
      org.hotosm.fmtm.api-url="${API_URL}" \
      org.hotosm.fmtm.main-url="${FRONTEND_MAIN_URL}"

WORKDIR /app
COPY main/package*.json ./
RUN npm install

ENV NODE_ENV production
COPY main/ .
RUN npm run build


FROM docker.io/devforth/spa-to-http:1.0.3 as prod
WORKDIR /app
# Add non-root user, permissions
RUN adduser -D -u 900 -h /home/appuser appuser
USER appuser
COPY --from=builder --chown=appuser:appuser /app/dist .

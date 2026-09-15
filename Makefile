# ============================================================
# Makefile для проекта nox
# ============================================================

PNPM := pnpm

.DEFAULT_GOAL := help

.PHONY: help
help: ## Показать список всех доступных команд
	@echo ""
	@echo "Использование: make <команда>"
	@echo ""
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

.PHONY: install
install: ## Установить зависимости через pnpm
	$(PNPM) install

.PHONY: dev
dev: ## Запустить пример (examples/app/app.ts)
	$(PNPM) dev

.PHONY: build
build: ## Собрать проект через TypeScript
	$(PNPM) build

.PHONY: start
start: ## Запустить собранный проект
	$(PNPM) start

.PHONY: test
test: ## Запустить тесты
	$(PNPM) test

.PHONY: test-watch
test-watch: ## Запустить тесты в watch-режиме
	$(PNPM) run test:watch

.PHONY: fmt
fmt: ## Форматировать код через oxfmt
	$(PNPM) run fmt

.PHONY: fmt-check
fmt-check: ## Проверить форматирование кода
	$(PNPM) run fmt:check

.PHONY: lint
lint: ## Запустить линтер
	$(PNPM) run lint

.PHONY: lint-fix
lint-fix: ## Запустить линтер с автоисправлением
	$(PNPM) run lint:fix

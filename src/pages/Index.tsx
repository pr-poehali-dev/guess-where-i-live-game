import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';

type Tab = 'game' | 'rules';

interface Organism {
  name: string;
  emoji: string;
  zone: string;
  fact: string;
}

const ZONES = [
  'Арктические пустыни',
  'Тундра',
  'Тайга',
  'Смешанные леса',
  'Степь',
  'Пустыня',
];

const ORGANISMS: Organism[] = [
  { name: 'Белый медведь', emoji: '🐻‍❄️', zone: 'Арктические пустыни', fact: 'Толстый слой жира и белый мех помогают выживать среди вечных льдов.' },
  { name: 'Карликовая берёза', emoji: '🌿', zone: 'Тундра', fact: 'Стелется по земле — так растение прячется от ледяного ветра.' },
  { name: 'Бурый медведь', emoji: '🐻', zone: 'Тайга', fact: 'Зимует в берлоге среди густых хвойных лесов.' },
  { name: 'Ковыль', emoji: '🌾', zone: 'Степь', fact: 'Узкие листья сворачиваются в трубочку, чтобы беречь влагу.' },
  { name: 'Сайгак', emoji: '🦌', zone: 'Степь', fact: 'Необычный нос-хоботок согревает и фильтрует степной воздух.' },
  { name: 'Пихта', emoji: '🌲', zone: 'Тайга', fact: 'Хвоя вместо листьев помогает переносить морозы и снег.' },
  { name: 'Лемминг', emoji: '🐹', zone: 'Тундра', fact: 'Маленький грызун — основа питания многих хищников тундры.' },
  { name: 'Полынь', emoji: '🪴', zone: 'Пустыня', fact: 'Серебристые волоски отражают солнце и сохраняют воду.' },
  { name: 'Благородный олень', emoji: '🦌', zone: 'Смешанные леса', fact: 'Обитает там, где соседствуют хвойные и лиственные деревья.' },
  { name: 'Морошка', emoji: '🫐', zone: 'Тундра', fact: 'Северная ягода, спеющая на болотах за короткое лето.' },
];

const Index = () => {
  const [tab, setTab] = useState<Tab>('game');
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const order = useMemo(() => ORGANISMS, []);
  const current = order[step];

  const choose = (zone: string) => {
    if (picked) return;
    setPicked(zone);
  };

  const next = () => {
    if (step + 1 >= order.length) {
      setFinished(true);
    } else {
      setStep((s) => s + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setStep(0);
    setPicked(null);
    setFinished(false);
  };

  const isCorrect = picked === current?.zone;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container max-w-3xl py-8">
          <div className="flex items-center gap-3 text-accent mb-2">
            <Icon name="Compass" size={22} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold text-muted-foreground">
              Природные зоны
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-black leading-tight text-primary">
            Угадай, где я живу?
          </h1>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Образовательная викторина о том, в каких природных зонах России обитают
            разные животные и растения.
          </p>
          <nav className="mt-6 flex gap-1 border-b border-border -mb-px">
            {([['game', 'Игра'], ['rules', 'Правила']] as [Tab, string][]).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                  tab === id
                    ? 'border-accent text-primary'
                    : 'border-transparent text-muted-foreground hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container max-w-3xl py-10">
        {tab === 'rules' && (
          <section className="animate-fade-in space-y-6">
            <h2 className="font-serif text-2xl font-bold text-primary">Как играть</h2>
            <ol className="space-y-4">
              {[
                'На карточке появляется название животного или растения.',
                'Всей группой обсудите и выберите природную зону из шести вариантов.',
                'Система сразу покажет, верно ли, и расскажет интересный факт.',
                'Переходите к следующей карточке — так разберёте все 10 организмов.',
                'В конце можно сыграть заново и закрепить материал.',
              ].map((t, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-serif font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-foreground/90">{t}</p>
                </li>
              ))}
            </ol>
            <div className="rounded-md border border-border bg-secondary p-5">
              <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                <Icon name="Lightbulb" size={18} />
                Совет
              </div>
              <p className="text-sm text-muted-foreground">
                Подумай о климате каждой зоны: где холодно и нет деревьев, где сплошные
                хвойные леса, а где сухо и жарко. Это поможет найти правильный ответ.
              </p>
            </div>
            <button
              onClick={() => setTab('game')}
              className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-6 py-3 font-semibold hover:opacity-90 transition-opacity"
            >
              Начать игру
              <Icon name="ArrowRight" size={18} />
            </button>
          </section>
        )}

        {tab === 'game' && !finished && current && (
          <section className="animate-fade-in">
            {/* progress */}
            <div className="flex items-center justify-between mb-6 text-sm">
              <span className="text-muted-foreground font-medium">
                Карточка {step + 1} из {order.length}
              </span>
              {step > 0 && (
                <button
                  onClick={() => { setStep((s) => s - 1); setPicked(null); }}
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary font-medium transition-colors"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Назад
                </button>
              )}
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden mb-8">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${(step / order.length) * 100}%` }}
              />
            </div>

            {/* card */}
            <div className="rounded-lg border border-border bg-card p-8 text-center shadow-sm">
              <div className="text-6xl mb-4">{current.emoji}</div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Кто это / что это?
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                {current.name}
              </h2>
              <p className="mt-2 text-muted-foreground">В какой природной зоне я живу?</p>
            </div>

            {/* answers */}
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {ZONES.map((zone) => {
                const chosen = picked === zone;
                const correct = zone === current.zone;
                let cls =
                  'border-border bg-card hover:border-accent hover:bg-secondary';
                if (picked) {
                  if (correct) cls = 'border-primary bg-primary/10 text-primary';
                  else if (chosen) cls = 'border-destructive bg-destructive/10 text-destructive';
                  else cls = 'border-border bg-card opacity-60';
                }
                return (
                  <button
                    key={zone}
                    onClick={() => choose(zone)}
                    disabled={!!picked}
                    className={`flex items-center justify-between rounded-md border px-5 py-4 text-left font-medium transition-all ${cls}`}
                  >
                    <span>{zone}</span>
                    {picked && correct && <Icon name="Check" size={18} />}
                    {picked && chosen && !correct && <Icon name="X" size={18} />}
                  </button>
                );
              })}
            </div>

            {/* feedback */}
            {picked && (
              <div className="mt-6 animate-fade-in rounded-md border border-border bg-secondary p-5">
                <div
                  className={`flex items-center gap-2 font-semibold mb-1 ${
                    isCorrect ? 'text-primary' : 'text-destructive'
                  }`}
                >
                  <Icon name={isCorrect ? 'CircleCheck' : 'CircleX'} size={18} />
                  {isCorrect ? 'Верно!' : `Правильный ответ: ${current.zone}`}
                </div>
                <p className="text-sm text-muted-foreground">{current.fact}</p>
                <button
                  onClick={next}
                  className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-6 py-2.5 font-semibold hover:opacity-90 transition-opacity"
                >
                  {step + 1 >= order.length ? 'Узнать результат' : 'Следующий вопрос'}
                  <Icon name="ArrowRight" size={18} />
                </button>
              </div>
            )}
          </section>
        )}

        {tab === 'game' && finished && (
          <section className="animate-scale-in text-center rounded-lg border border-border bg-card p-10 shadow-sm">
            <div className="text-5xl mb-4">🎓</div>
            <h2 className="font-serif text-3xl font-black text-primary mb-2">
              Все карточки разобраны!
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Вы прошли все {order.length} организмов и узнали, где они обитают.
              Можно сыграть заново и закрепить материал.
            </p>
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-6 py-3 font-semibold hover:opacity-90 transition-opacity"
            >
              <Icon name="RotateCcw" size={18} />
              Сыграть заново
            </button>
          </section>
        )}
      </main>

      <footer className="border-t border-border mt-10">
        <div className="container max-w-3xl py-6 text-center text-xs text-muted-foreground">
          Образовательная викторина · Природные зоны и их обитатели
        </div>
      </footer>
    </div>
  );
};

export default Index;
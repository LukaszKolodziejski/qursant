'use client';
type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type StructuredDataProps = {
  data: JsonLd;
  id?: string;
};

export default function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
